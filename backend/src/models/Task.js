const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  dueDate: {
    type: Date
  },
  category: {
    type: String,
    enum: ['Work', 'Personal', 'Learning'],
    default: 'Personal'
  },
  order: {
    type: Number,
    default: 0
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});


taskSchema.index({ owner: 1, completed: 1 });
taskSchema.index({ owner: 1, category: 1 });
taskSchema.index({ owner: 1, priority: 1 });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task; 