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

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

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