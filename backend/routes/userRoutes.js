import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.get("/", authMiddleware, async (req, res) => {
	res.status(200).json(req.user); // keeps user logged in
});
// router.put("/profile-image", authMiddleware, updateProfileImage);

export default router;
