import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import NavBar from "./components/NavBar";
import { useUser } from "./context/UserContext.jsx";

export default function App() {
	const { user } = useUser(); // bring in user info

	return (
		<>
			<NavBar />

			<div className="app-container">
				{user ? (
					<Routes>
						<Route
							path="/dashboard"
							element={<Dashboard />}
						/>
						<Route
							path="/projects/:projectId/tasks"
							element={<ProjectDetails />}
						/>
						<Route
							path="*"
							element={<Navigate to="/dashboard" />}
						/>
					</Routes>
				) : (
					<Routes>
						<Route
							path="/login"
							element={<Login />}
						/>
						<Route
							path="/register"
							element={<Register />}
						/>
						<Route
							path="*"
							element={<Navigate to="/login" />}
						/>
					</Routes>
				)}
			</div>
		</>
	);
}
