import { useEffect, useState } from "react";
import { projectClient } from "../clients/api";
import Project from "../components/Project";

export default function Dashboard() {
	const [projects, setProjects] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchProjects() {
			try {
				// get projects from db > save in component's state
				const { data } = await projectClient.get("/");
				setProjects(data);
			} catch (err) {
				console.log(err.response.data);
			} finally {
				setLoading(false); // hide loading once the data is fetched
			}
		}
		fetchProjects();
	}, []);

	const handleEdit = async (e, projectId, title, description) => {
		e.preventDefault();
		try {
			await projectClient.put(`/${projectId}`, { title, description });
			setProjects(projects.map((project) => (project._id === projectId ? { ...project, title, description } : project)));
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async (projectId) => {
		if (window.confirm("Are you sure you want to delete this project?")) {
			try {
				await projectClient.delete(`/${projectId}`);
				setProjects(projects.filter((project) => project._id !== projectId));
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// POST request (based off state: title and description) > add new project to state
			const { data } = await projectClient.post("/", { title, description });
			setProjects([data, ...projects]);

			// reset the form
			setTitle("");
			setDescription("");
		} catch (err) {
			console.log(err);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>Your Projects</h1>

			<form
				id="project-form"
				onSubmit={handleSubmit}
			>
				<h2>Create a new project!</h2>

				<label htmlFor="project-title">Title:</label>
				<input
					type="text"
					id="project-title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Project title"
					required
				/>

				<label htmlFor="project-description">Description:</label>
				<textarea
					type="text"
					id="project-description"
					value={description}
					placeholder="About my project..."
					onChange={(e) => setDescription(e.target.value)}
					required
				/>

				<button>Add Project</button>
			</form>

			<div className="grid">
				{projects.map((project) => (
					<Project
						project={project}
						key={project._id}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
				))}
			</div>
		</div>
	);
}
