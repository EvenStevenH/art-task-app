import mongoose from "mongoose";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

export async function createProject(req, res) {
	try {
		const project = await Project.create({ ...req.body, user: req.user._id }); // adds related user
		await project.populate("user", "username"); // turn user field from id into user document (includes username)

		res.status(200).json(project);
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ message: error.message });
	}
}

export async function getAllProjects(req, res) {
	try {
		const projects = await Project.find({ user: req.user._id })
			.sort({ createdAt: -1 }) // new to old
			.populate("user", "username"); // id in "user" > match with id from model > only keep 'username' field

		res.status(200).json(projects);
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ message: error.message });
	}
}

export async function getOneProject(req, res) {
	try {
		const { id } = req.params;

		// validate ObjectId format
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ message: "Invalid project ID format!" });
		}

		// find project by id
		const project = await Project.findById(id).populate("user", "username");
		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}
		if (project.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: "Incorrect user!" });
		}

		res.json(project);
	} catch (error) {
		res.status(500).json({ message: "An unexpected error occurred." });
	}
}

export async function updateProject(req, res) {
	try {
		const { id } = req.params;

		// validate ObjectId format
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ message: "Invalid project ID format!" });
		}

		// find project by id
		const project = await Project.findById(id);
		if (!project) {
			return res.status(404).json({ message: "Can't find project with this id!" });
		}
		if (project.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: "Not authorized to update this project!" });
		}

		// perform update
		const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
		res.json(updatedProject);
	} catch (error) {
		res.status(500).json({ message: "An unexpected error occurred." });
	}
}

export async function deleteProject(req, res) {
	try {
		// find project by id
		const project = await Project.findById(req.params.id);
		if (!project) {
			return res.status(404).json({ message: "Can't find project with this id!" });
		}
		if (project.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: "Not authorized to update this project!" });
		}

		// delete project and its associated tasks if authorized
		await Task.deleteMany({ project: project._id });
		await project.deleteOne();
		res.json({ message: "Project deleted successfully!" });
	} catch (error) {
		res.status(500).json({ message: "An unexpected error occurred." });
	}
}
