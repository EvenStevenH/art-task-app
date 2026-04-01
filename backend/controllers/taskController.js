import mongoose from "mongoose";
import Task from "../models/Task.js";
import Project from "../models/Project.js";

export async function createTask(req, res) {
	try {
		const { projectId } = req.params; // req.params.projectId

		// validate ObjectId format
		if (!mongoose.Types.ObjectId.isValid(projectId)) {
			return res.status(404).json({ message: "Invalid project ID format!" });
		}

		// find project
		const project = await Project.findById(projectId);
		if (!project) {
			return res.status(404).json({ message: "Can't find project with this id!" });
		}
		if (project.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: "Not authorized!" });
		}

		// create task
		const task = await Task.create({
			title: req.body.title,
			description: req.body.description,
			status: req.body.status,
			project: project._id,
		});
		res.status(201).json(task);
	} catch (error) {
		res.status(500).json({ message: "An unexpected error occurred." });
	}
}

export async function getAllTasks(req, res) {
	try {
		const { projectId } = req.params;
		// validate ObjectId format
		if (!mongoose.Types.ObjectId.isValid(projectId)) {
			return res.status(404).json({ message: "Invalid project ID format!" });
		}

		// find project
		const project = await Project.findById(projectId);
		if (!project) {
			return res.status(404).json({ message: "Can't find project with this id!" });
		}
		if (project.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: "Not authorized!" });
		}

		const tasks = await Task.find({ project: project._id });
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ message: "An unexpected error occurred." });
	}
}

export async function updateTask(req, res) {
	try {
		const { taskId } = req.params;

		// validate ObjectId format
		if (!mongoose.Types.ObjectId.isValid(taskId)) {
			return res.status(404).json({ message: "Invalid task ID format!" });
		}

		// find project by id
		const task = await Task.findById(taskId).populate("project");
		if (!task) {
			return res.status(404).json({ message: "Task not found!" });
		}
		if (task.project.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: "Not authorized!" });
		}

		// perform update
		task.title = req.body.title || task.title;
		task.description = req.body.description || task.description;
		task.status = req.body.status || task.status;
		const updatedTask = await task.save();
		res.json(updatedTask);
	} catch (error) {
		res.status(500).json({ message: "An unexpected error occurred." });
	}
}

export async function deleteTask(req, res) {
	try {
		const { taskId } = req.params;

		// validate ObjectId format
		if (!mongoose.Types.ObjectId.isValid(taskId)) {
			return res.status(404).json({ message: "Invalid task ID format!" });
		}

		// find task
		const task = await Task.findById(taskId).populate("project");
		if (!task) {
			return res.status(404).json({ message: "Task not found!" });
		}
		if (task.project.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: "Not authorized!" });
		}

		// delete if authorized
		await task.deleteOne();
		res.json({ message: "Task deleted successfully!" });
	} catch (error) {
		res.status(500).json({ message: "An unexpected error occurred." });
	}
}
