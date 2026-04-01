import { Link } from "react-router-dom";
import { useState } from "react";
import { userClient } from "../clients/api";
import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const { setUser } = useUser(); // bring in setter from context
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await userClient.post("/login", form); // send the form data to backend
			localStorage.setItem("token", data.token); // store token locally
			setUser(data.user); // save some user data in our state
			navigate("/dashboard");
		} catch (error) {
			console.log(error);
			setError(error.message);
		}
	};

	return (
		<div className="auth-page">
			<div className="auth-panel">
				<h1>Login</h1>

				<form onSubmit={handleSubmit}>
					<label htmlFor="email">Email:</label>
					<input
						value={form.email}
						onChange={handleChange}
						id="email"
						name="email"
						type="email"
						required
					/>

					<label htmlFor="password">Password:</label>
					<input
						value={form.password}
						onChange={handleChange}
						id="password"
						name="password"
						type="password"
						required
					/>

					<button>Login</button>

					{error && <p>{error}</p>}
				</form>

				<p className="auth-link">
					Don't have an account? <Link to="/register">Register here</Link>!
				</p>
			</div>
		</div>
	);
}
