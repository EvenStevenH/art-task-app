import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectClient } from "../clients/api";

export default function Project({ project, setProjects, projects }) {
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(project.title);
	const [description, setDescription] = useState(project.description);
	const navigate = useNavigate();
	const date = new Date(project.createdAt);

	const handleViewDetails = () => {
		navigate(`/projects/${project._id}/tasks`); // navigate to tasks page for this project
	};

	const handleEdit = async (e) => {
		e.preventDefault();
		try {
			await projectClient.put(`/${project._id}`, { title, description });
			setIsEditing(false);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this project?")) {
			try {
				await projectClient.delete(`/${project._id}`);
				setProjects(projects.filter((p) => p._id !== project._id)); // remove project from state
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<div className="card">
			{isEditing ? (
				<form onSubmit={handleEdit}>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<button type="submit">Save</button>
					<button onClick={() => setIsEditing(false)}>Cancel</button>
				</form>
			) : (
				<>
					<div id="project-info">
						<h3>{project.title}</h3>
						<p id="project-username">by {project.user.username}</p>
						<div>
							{date.toLocaleDateString()} {date.toLocaleTimeString()}
						</div>
						<p>{project.description}</p>
					</div>

					<div id="card-actions">
						<button
							className="viewBtn"
							onClick={handleViewDetails}
						>
							<img
								src="/src/components/icons/view.svg"
								alt="View icon"
							/>
							View
						</button>
						<button
							className="editBtn"
							onClick={() => setIsEditing(true)}
						>
							<img
								src="/src/components/icons/edit.svg"
								alt="Edit icon"
							/>
							Edit
						</button>
						<button
							className="deleteBtn"
							onClick={() => handleDelete(project._id)}
						>
							<img
								src="/src/components/icons/delete.svg"
								alt="Delete icon"
							/>
							Delete
						</button>
					</div>
				</>
			)}
		</div>
	);
}
