import express from "express";
import cors from "cors";
import "dotenv/config";
import "./config/connection.js";

import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/projects/:projectId/tasks", taskRoutes);
app.get("/", (req, res) => {
	res.send("Hello, planet! API appears to be working.");
});

const port = process.env.port || 3001;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
