import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export async function authMiddleware(req, res, next) {
	try {
		let token =
			req.body?.token ||
			(req.headers.authorization && req.headers.authorization.split(" ").pop().trim()) || // remove "Bearer"
			req.query?.token;

		// check token
		if (!token) {
			return res.status(401).json({ message: "No token provided!" });
		}

		// verify token > pass payload to req > move onto router (or next middleware)
		const { data } = jwt.verify(token, jwtSecret);
		req.user = data;
		next();
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: error.message });
	}
}

export function signToken(user) {
	const payload = {
		username: user.username,
		email: user.email,
		_id: user._id,
		// profileImage: user.profileImage,
	};

	return jwt.sign({ data: payload }, jwtSecret, { expiresIn: "2d" }); // create a token
}
