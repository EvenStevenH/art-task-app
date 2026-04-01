import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		match: [/.+@.+\..+/, "Must use a valid email address!"],
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
	},
	profileImage: {
		type: String,
		default: "/images/default-avatar.png",
		// match: [/^https?:\/\/.+/, "Must be a valid URL!"],
	},
});

// hash password before saving it
userSchema.pre("save", async function () {
	if (this.password && (this.isNew || this.isModified("password"))) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}
});

// custom method to compare and validate password for logging in
userSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
