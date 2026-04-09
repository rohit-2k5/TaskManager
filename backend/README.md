# Task Manager - Backend

Simple Express + Mongoose backend for Task Manager assignment.

Prereqs
- Node 18+ (or recent LTS)
- npm
- A MongoDB connection string in `.env` as DB_URL

Setup
1. cd backend
2. npm install
3. Create `.env` with:
   PORT=8000
   DB_URL=mongodb+srv://<user>:<pass>@cluster0.../dbname

Run
- npm start or node app.js

API
- GET /tasks
- POST /tasks { title }
- PATCH /tasks/:id { completed, title }
- DELETE /tasks/:id

Notes
- No authentication for this small assignment as it was not asked.
