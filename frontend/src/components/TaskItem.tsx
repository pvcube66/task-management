import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../services/tasks';
import { motion } from 'framer-motion';
import {
  TrashIcon,
  PencilSquareIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface TaskItemProps {
  task: Task;
  index: number;
  onDelete: (taskId: string) => Promise<void>;
  onEdit: (task: Task) => void;
  onToggleComplete: (taskId: string, completed: boolean) => Promise<void>;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  onDelete,
  onEdit,
  onToggleComplete,
}) => {
  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      High: 'bg-red-100 text-red-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      Low: 'bg-green-100 text-green-800',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Work: 'bg-blue-100 text-blue-800',
      Personal: 'bg-purple-100 text-purple-800',
      Learning: 'bg-indigo-100 text-indigo-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...(provided.dragHandleProps as object)} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          whileHover={{ scale: 1.02 }}
          className={`group relative rounded-lg border p-4 shadow-sm transition-all duration-200 ${
            snapshot.isDragging ? 'shadow-lg ring-2 ring-indigo-500 ring-opacity-50' : ''
          } ${task.completed ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="flex items-start gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onToggleComplete(task._id, !task.completed)}
              className={`mt-1 h-5 w-5 rounded-full border-2 ${
                task.completed
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-300 hover:border-indigo-500'
              }`}
            >
              {task.completed && <CheckCircleIcon className="h-4 w-4 text-white" />}
            </motion.button>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onEdit(task)}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete(task._id)}
                    className="rounded p-1 text-gray-400 hover:bg-red-100 hover:text-red-600"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>

              {task.description && (
                <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                  {task.description}
                </p>
              )}

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(task.category)}`}>
                  {task.category}
                </span>
                {task.dueDate && (
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </Draggable>
  );
};

export default TaskItem;
