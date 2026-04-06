# Art Task App

A project management tool built using the MERN stack, for artists and people who want to manage their projects and tasks! It offers a modular API with RESTFUL endpoints, ownership-based authentication/authorization routes, and an intuitive, user-friendly interface.

In the future, possible features I'd like to explore include the ability to toggle sorting tasks by status in a Kanban-style board, account management (e.x. updating your email or profile picture), deadline functionalities, a feed system for project sharing and collaboration, and general UI/UX considerations.

Icons from [Google Fonts](https://fonts.google.com/icons). Special thanks to **Jade Del Rosario-Bell** and **Quinn Shannon** for their instruction and assistance with this capstone project!

## Instructions

You can visit the frontend at [art-task-app.netlify.app](https://art-task-app.netlify.app) (recommended), or the backend at [art-task-app.onrender.com](https://art-task-app.onrender.com)! They are deployed on free plans, so usage may be limited (ex. by the amount of monthly credits available).

If you'd like to run this project locally:

- In your terminal: `git clone` this repository, navigate to the project folder, and `npm install` the neccessary dependencies.

- In both the frontend and backend directories, rename `.env.example` to `.env` and update the variables with your local environment variables. Finally, run `npm run dev` inside both to start their servers and view the project!

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
