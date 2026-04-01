import express from "express";
import { authMiddleware } from "../utils/auth.js";
import { createTask, deleteTask, getAllTasks, updateTask } from "../controllers/taskController.js";

const router = express.Router({ mergeParams: true });
router.use(authMiddleware);
router.route("/").get(getAllTasks).post(createTask);
router.route("/:taskId").put(updateTask).delete(deleteTask);

export default router;
