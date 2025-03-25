import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Task } from '../services/tasks';
import TaskItem from './TaskItem';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (taskId: string) => Promise<void>;
  onEditTask: (task: Task) => void;
  onToggleComplete: (taskId: string, completed: boolean) => Promise<void>;
  onDragEnd: (result: any) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDeleteTask,
  onEditTask,
  onToggleComplete,
  onDragEnd,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <motion.div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AnimatePresence mode="popLayout">
              {tasks.map((task, index) => (
                <motion.div
                  key={task._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  layout
                >
                  <TaskItem
                    task={task}
                    index={index}
                    onDelete={onDeleteTask}
                    onEdit={onEditTask}
                    onToggleComplete={onToggleComplete}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </motion.div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList; 