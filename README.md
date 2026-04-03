# Art Task App

- A simple project management tool for artists and people who want to manage their projects and tasks! Intuitive for single users, and built using the MERN stack.

- Special thanks to Jade Del Rosario-Bell and Quinn Shannon for their instruction and assistance with this project!

## Instructions

You can visit the page at:

- Frontend: [art-task-app.netlify.app](https://art-task-app.netlify.app)
- Backend: [art-task-app.onrender.com](https://art-task-app.onrender.com)

If you'd like to run it locally, you can `git clone` this repository and use `npm install` to install the neccessary dependencies. Then, you run `npm run dev` on both the frontend and backend folders to view the project in `localhost`!

### User Routes

- `POST /api/users/register` > register a new user
- `POST /api/users/login` > user log-in

### Projects Routes

- `POST /api/projects` > create a project
- `GET /api/projects` > get ALL projects
- `GET /api/projects/:id` > get ONE project
- `PUT /api/projects/` > update a project
- `DELETE /api/projects/:id` > delete a project

### Tasks Routes

- `POST /api/projects/:projectId/tasks` > create a task
- `GET /api/projects/:projectsId/tasks` > get all tasks for a specific project
- `PUT /api/tasks/:taskId` > update task
- `DELETE /api/tasks/:taskId` > delete a task
