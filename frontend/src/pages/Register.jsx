import { Link } from "react-router-dom";
import { useState } from "react";
import { userClient } from "../clients/api";
import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import LeftPane from "../components/LeftPane.jsx";

export default function Register() {
	// bring in setter function from context
	const { setUser } = useUser();
	const navigate = useNavigate();

	const [form, setForm] = useState({
		username: "",
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
			const { data } = await userClient.post("/register", form); // send the form data to our backend
			localStorage.setItem("token", data.token); // store token locally
			setUser(data.user); // save some user data in state >
			navigate("/dashboard");
		} catch (error) {
			console.log(error);
			setError(error.message);
		}
	};

	return (
		<div className="auth-page">
			<LeftPane />

			<div className="right-pane">
				<div className="auth-panel">
					<h1>Register</h1>

					<form onSubmit={handleSubmit}>
						<label htmlFor="username">Username:</label>
						<input
							value={form.username}
							onChange={handleChange}
							id="username"
							name="username"
							type="text"
							required
						/>

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

						<button>Register</button>
					</form>

					<p className="auth-link">
						Already have an account? <Link to="/login">Login here</Link>!
					</p>

					{error && <p id="error-message">{error}</p>}
				</div>
			</div>
		</div>
	);
}
