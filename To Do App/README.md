# Full-Stack Todo Application

A modern Todo application built with Flask (Backend) and React.js (Frontend) with JWT authentication.

## Features

- User Authentication (Register/Login)
- JWT-based authorization
- Create, Read, Update, Delete (CRUD) operations for tasks
- Mark tasks as completed
- Material-UI and Tailwind CSS for modern UI
- Secure API endpoints
- SQLite database

## Project Structure

```
todo-app/
├── backend/               # Flask backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── models/
│   │   ├── routes/
│   │   └── config.py
│   ├── requirements.txt
│   └── run.py
└── frontend/             # React frontend
    ├── public/
    ├── src/
    └── package.json
```

## Backend Setup

1. Create and activate virtual environment:
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask server:
```bash
python run.py
```

## Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm start
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user

### Tasks
- GET /api/tasks - Get all tasks
- POST /api/tasks - Create new task
- PUT /api/tasks/<task_id> - Update task
- DELETE /api/tasks/<task_id> - Delete task
- PATCH /api/tasks/<task_id>/toggle - Toggle task completion

## Tech Stack

### Backend
- Flask
- Flask-SQLAlchemy
- Flask-JWT-Extended
- Flask-Bcrypt
- Flask-CORS

### Frontend
- React.js
- Material-UI
- Tailwind CSS
- Axios
- React Router DOM
