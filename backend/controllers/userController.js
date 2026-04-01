import { User } from "../models/User.js";
import { signToken } from "../utils/auth.js";

export async function registerUser(req, res) {
	try {
		// check if user already exists
		const userExists = await User.findOne({ email: req.body.email });
		if (userExists) {
			console.log("User already exists!");
			return res.status(400).json({ message: "User already exists!" });
		}

		// create new user with hashed password > create a token
		const user = await User.create(req.body);
		const token = signToken(user);
		res.status(201).json({ token, user });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
}

export async function loginUser(req, res) {
	try {
		// find the user > check if the user exists
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(400).json({ message: "User does not exist!" });
		}

		// check password
		const correctPassword = await user.matchPassword(req.body.password);
		if (!correctPassword) {
			return res.status(400).json({ message: "Incorrect password!" });
		}

		// create token
		const token = signToken(user);
		res.status(201).json({ message: "Login successful!", token, user });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
}

// export async function updateProfileImage(req, res) {
// 	try {
// 		const user = await User.findByIdAndUpdate(req.user._id, { profileImage: req.body.profileImage }, { new: true });
// 		const token = signToken(user); // include token in response to be updated on client side
// 		res.status(200).json({ user, token }); // send both updated user and new token
// 	} catch (err) {
// 		res.status(500).json({ message: err.message });
// 	}
// }
