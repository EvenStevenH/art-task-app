# Art Task App

A project management tool built using the MERN stack, for artists and people who want to manage their projects and tasks! It offers a modular API with RESTFUL endpoints, ownership-based authentication/authorization routes, and an intuitive, user-friendly interface.

In the future, possible features I'd like to explore include the ability to toggle sorting tasks by status in a Kanban-style board, account management (e.x. updating your email or profile picture), deadline functionalities, a feed system for users for sharing and collaboration, and general UI/UX considerations.

Special thanks to Jade Del Rosario-Bell and Quinn Shannon for their instruction and assistance with this project!

## Instructions

You can visit the frontend page at [art-task-app.netlify.app](https://art-task-app.netlify.app) (recommended), or the backend page at [art-task-app.onrender.com](https://art-task-app.onrender.com). If you'd like to run this project locally, `git clone` this repository and use `npm install` to install the neccessary dependencies. Then, run `npm run dev` on both the frontend and backend folders to view the project in `localhost`!

## API Endpoints

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
