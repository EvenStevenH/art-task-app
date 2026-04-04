import { useEffect, useState } from "react";
import { projectClient } from "../clients/api";
import Project from "../components/Project";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";
import { isValidImageUrl } from "../validators";

export default function Dashboard() {
	const [projects, setProjects] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [isFormVisible, setIsFormVisible] = useState(false);
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

	const handleEdit = async (e, projectId, title, description, image) => {
		e.preventDefault();
		try {
			await projectClient.put(`/${projectId}`, { title, description, image });
			setProjects(projects.map((project) => (project._id === projectId ? { ...project, title, description, image } : project)));
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

		isValidImageUrl(image); // validate image link

		try {
			// POST request (based off state) > add new project to state > reset and hide the form
			const { data } = await projectClient.post("/", { title, description, image });
			setProjects([data, ...projects]);
			setTitle("");
			setDescription("");
			setImage("");
			setIsFormVisible(false);
		} catch (err) {
			console.log(err);
		}
	};

	if (loading) return <Spinner />;

	return (
		<main>
			<h1>Your Projects</h1>

			{projects.length < 1 && <div className="empty-message">No projects. Let's create something today!</div>}

			<section
				className="grid"
				id="project-grid"
			>
				{projects.map((project) => (
					<div
						className="card"
						key={project._id}
					>
						<Project
							project={project}
							onEdit={handleEdit}
							onDelete={handleDelete}
							isInDashboard={true}
						/>
					</div>
				))}

				{!isFormVisible && (
					<button
						className="toggleFormBtn"
						onClick={() => setIsFormVisible(!isFormVisible)}
					>
						{/* <img
							src="/src/components/icons/add_beige.svg"
							alt="Add icon"
						/> */}
						<span className="material-symbols-outlined">add</span>
						{projects.length < 1 ? `Your first project!` : `New Project`}
					</button>
				)}

				{isFormVisible && (
					<form
						id="create-form"
						className={`create-form reveal-animation ${!isFormVisible ? "hidden" : "visible"}`}
						onSubmit={handleSubmit}
					>
						<h3>Create a new project!</h3>

						<label htmlFor="project-title">Title:</label>
						<input
							type="text"
							id="project-title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="New Project"
							required
							autoFocus
						/>

						<label htmlFor="project-description">Description:</label>
						<textarea
							id="project-description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="About my project..."
						/>

						<label htmlFor="project-image-link">Image (optional):</label>
						<input
							id="project-image-link"
							value={image}
							onChange={(e) => setImage(e.target.value)}
							placeholder="https://domain.com/image.jpg"
						/>

						<div className="button-actions">
							<button
								className="addNewBtn"
								type="submit"
							>
								{/* <img
									src="/src/components/icons/add_white.svg"
									alt="Add icon"
								/> */}
								<span className="material-symbols-outlined">add</span>
								Add Project
							</button>
							<button
								type="button"
								onClick={() => setIsFormVisible(false)}
							>
								Cancel
							</button>
						</div>
					</form>
				)}
			</section>

			<Footer />
		</main>
	);
}
