# Task Management Application

A modern, full-stack task management application built with React, Node.js, and MongoDB.

## Features

- ✨ Beautiful and responsive UI with dark mode support
- 📱 Fully mobile-responsive design
- 🎯 Task management (create, edit, delete, mark as completed)
- 🔄 Drag-and-drop task reordering
- 🏷️ Task prioritization (Low, Medium, High)
- 📅 Due dates with calendar picker
- 📂 Task categories (Work, Personal, Learning)
- 🔍 Search and filter functionality
- 📊 Progress tracking
- 🔐 User authentication with JWT
- 🌙 Dark mode support
- ✨ Smooth animations with Framer Motion

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- React DnD (for drag-and-drop)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- 
###Screenshots of the app
![Screenshot 2025-03-26 172643](https://github.com/user-attachments/assets/07f062a5-64c5-4775-9aab-660faa88280a)

![Screenshot 2025-03-26 172626](https://github.com/user-attachments/assets/3e6af1cd-7421-4b1d-814c-d8769c2f28b8)
![Screenshot 2025-03-26 172706](https://github.com/user-attachments/assets/2aedf178-5902-43a7-a8a4-de183e0fc931)

![Screenshot 2025-03-26 172727](https://github.com/user-attachments/assets/7a400518-3dbd-478f-b0e8-d72e4f7c5432)
![Screenshot 2025-03-26 172951](https://github.com/user-attachments/assets/ab4ed3bc-e89b-4cb0-9032-c11c149fc8a2)


### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-management
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm start
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Task Endpoints
- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details. 
