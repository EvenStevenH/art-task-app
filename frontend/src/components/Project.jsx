import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Project({ project, onEdit, onDelete }) {
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(project.title);
	const [description, setDescription] = useState(project.description);
	const navigate = useNavigate();
	const date = new Date(project.createdAt);

	const handleViewDetails = () => {
		navigate(`/projects/${project._id}/tasks`);
	};

	const handleEditToggle = () => {
		setIsEditing(!isEditing);
	};

	return (
		<div className="card">
			{isEditing ? (
				<form  onSubmit={(e) => onEdit(e, project._id, title, description)}>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>

					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>

					<div id="card-actions">
						<button type="submit">Save</button>
						<button onClick={handleEditToggle}>Cancel</button>
					</div>
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
							onClick={handleEditToggle}
						>
							<img
								src="/src/components/icons/edit.svg"
								alt="Edit icon"
							/>
							Edit
						</button>
						<button
							className="deleteBtn"
							onClick={() => onDelete(project._id)}
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
