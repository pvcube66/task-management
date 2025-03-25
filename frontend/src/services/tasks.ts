import api from './api';

export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: string;
  category: 'Work' | 'Personal' | 'Learning';
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  priority: Task['priority'];
  dueDate?: string;
  category: Task['category'];
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  completed?: boolean;
  order?: number;
}

const taskService = {
  async getAllTasks(): Promise<Task[]> {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  },

  async createTask(data: CreateTaskData): Promise<Task> {
    const response = await api.post<Task>('/tasks', data);
    return response.data;
  },

  async updateTask(id: string, data: UpdateTaskData): Promise<Task> {
    const response = await api.put<Task>(`/tasks/${id}`, data);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  async reorderTasks(tasks: { id: string; order: number }[]): Promise<void> {
    await api.patch('/tasks/reorder', { tasks });
  },
};

export default taskService; 