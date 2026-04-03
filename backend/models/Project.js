import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", // for ownership > enables auth checks later
			required: true,
		},
		image: {
			type: String,
			default: "/images/default-banner.png",
		},
	},
	{
		timestamps: true, // adds createdAt and updatedAt
	},
);

export default mongoose.model("Project", projectSchema);
