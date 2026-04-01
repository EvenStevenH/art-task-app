import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			default: "No description.",
		},
		status: {
			type: String,
			enum: ["To Do", "In Progress", "Done"],
			default: "To Do",
		},
		project: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Project", // tasks belong to projects, not users directly
			required: true,
		},
	},
	{
		timestamps: true, // adds createdAt and updatedAt
	},
);

export default mongoose.model("Task", taskSchema);
