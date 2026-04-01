import express from "express";
import { authMiddleware } from "../utils/auth.js";
import { createProject, deleteProject, getAllProjects, getOneProject, updateProject } from "../controllers/projectController.js";

const router = express.Router();
router.use(authMiddleware);
router.route("/").get(getAllProjects).post(createProject);
router.route("/:id").get(getOneProject).put(updateProject).delete(deleteProject);

export default router;
