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
					required={true}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<br />
				<label htmlFor="project-description">Description:</label>
				<textarea
					type="text"
					id="project-description"
					required={true}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<br />
				<button>Submit</button>
			</form>

			<div className="projects-grid">
				{projects.map((project) => (
					<Project
						project={project}
						projects={projects}
						key={project._id}
						setProjects={setProjects}
					/>
				))}
			</div>
		</div>
	);
}
