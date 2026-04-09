# Task Manager (Frontend + Backend)

# NOTE 
if you want to run the project locally then create a cluster and give the url in the backend .env file. 

If you don't wanna setup the project locally for checking the visit the live link here [your-live-link.com](https://your-live-link.com)



Small Task Manager app — React + Vite frontend and Express + Mongoose backend.

This single README contains setup and run instructions for both the frontend and backend so testers can run the full app from the repository root.

## Prerequisites
- Node.js 18+ and npm
- Internet access to reach MongoDB Atlas if you plan to use a cloud DB

## Project layout
- backend/ — Express + Mongoose API
- frontend/ — React + Vite UI

## Environment
Create a `.env` file in `backend/` with the following values (replace `<your_mongo_uri>` with your own Atlas or MongoDB connection string):

```
PORT=8000
DB_URL=<your_mongo_uri>
```

How to get a MongoDB Atlas URI
- Create a free cluster at https://www.mongodb.com/cloud/atlas and create a database user.
- Obtain the connection string from the Atlas UI and replace the placeholders (user, password, and database name).
- Example placeholder format (do NOT use verbatim):
  `mongodb+srv://<user>:<password>@cluster0.xyz.mongodb.net/<your-db-name>`
- If Atlas restricts IP access, add your IP address in the Network Access panel so your machine can connect.

## Setup & Run
1. Install dependencies

```powershell
cd backend; npm install
cd ..\frontend; npm install
```

2. Start backend

```powershell
cd backend
npm start
```

This starts the backend on the port set in `backend/.env` (default 8000).

3. Start frontend (in a separate terminal)

```powershell
cd frontend
npm run dev
```

Open the frontend URL shown by Vite (usually http://localhost:5173) — the frontend expects the backend API at http://localhost:8000/tasks.

## API (backend)
- GET /tasks — list tasks
- POST /tasks { title } — create task
- PATCH /tasks/:id { completed, title } — update task (partial)
- DELETE /tasks/:id — delete task

Responses are JSON with standard HTTP status codes (200/201/400/404/500).

## Frontend features
- Display tasks
- Add task (simple duplicate check client-side)
- Mark task completed/uncompleted
- Edit task title inline (Edit → Save/Cancel)
- Delete task
- Filters: All / Completed / Not completed
- Notifications via react-hot-toast




