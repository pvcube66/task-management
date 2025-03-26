const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Task = require('../models/Task');

 
router.get('/', auth, async (req, res) => {
  try {
    const match = {};
    const sort = {};

     
    if (req.query.completed) {
      match.completed = req.query.completed === 'true';
    }
 
    if (req.query.category) {
      match.category = req.query.category;
    }

    
    if (req.query.priority) {
      match.priority = req.query.priority;
    }

    
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    const tasks = await Task.find({
      owner: req.user._id,
      ...match
    }).sort(sort);

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

 
router.post('/', [auth, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('priority').isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority level'),
  body('category').isIn(['Work', 'Personal', 'Learning']).withMessage('Invalid category')
]], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = new Task({
      ...req.body,
      owner: req.user._id
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

 
router.put('/:id', [auth, [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('priority').optional().isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority level'),
  body('category').optional().isIn(['Work', 'Personal', 'Learning']).withMessage('Invalid category')
]], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'completed', 'priority', 'dueDate', 'category', 'order'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    updates.forEach(update => task[update] = req.body[update]);
    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

 
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

 
router.patch('/reorder', auth, async (req, res) => {
  try {
    const { tasks } = req.body;

    if (!Array.isArray(tasks)) {
      return res.status(400).json({ message: 'Invalid request format' });
    }

    
    const session = await Task.startSession();
    await session.withTransaction(async () => {
      for (const { id, order } of tasks) {
        await Task.findOneAndUpdate(
          { _id: id, owner: req.user._id },
          { order },
          { session }
        );
      }
    });

    session.endSession();
    res.json({ message: 'Tasks reordered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 