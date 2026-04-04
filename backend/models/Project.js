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
			trim: true,
			default: "/images/default-banner.png",
			// set: (val) => val || "/images/default-banner.png", // prevent empty strings
			set: function (val) {
				if (val === null) {
					return "/images/default-banner.png";
				}
				return val; // user-provided value (including empty strings)
			},
			validate: {
				validator: function (val) {
					if (!val) return true; // allow empty > use default
					return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(val);
				},
				message: `Image must be a valid URL, beginning with "https://" and ending in jpg, jpeg, png, or gif!`,
			},
		},
	},
	{
		timestamps: true, // adds createdAt and updatedAt
	},
);

export default mongoose.model("Project", projectSchema);
