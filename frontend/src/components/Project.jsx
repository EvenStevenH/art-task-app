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

	const handleEditSubmit = (e) => {
		e.preventDefault();
		onEdit(e, project._id, title, description);
		setIsEditing(false);
	};

	return (
		<div className="card">
			{isEditing ? (
				<>
					<form
						className="edit-form"
						onSubmit={handleEditSubmit}
					>
						<div id="edit-form-input">
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder={project.title}
							/>

							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder={project.description}
							/>
						</div>

						<div className="button-actions">
							<button
								className="editSaveBtn"
								type="submit"
							>
								<img
									src="/src/components/icons/save.svg"
									alt="Save icon"
								/>
								Save
							</button>
							<button onClick={handleEditToggle}>
								<img
									src="/src/components/icons/cancel.svg"
									alt="Cancel icon"
								/>
								Cancel
							</button>
						</div>
					</form>
				</>
			) : (
				<>
					<div id="project-info">
						<h3>{project.title}</h3>
						<p id="project-username">by {project.user.username}</p>
						<p className="date">
							{date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
						</p>
						<p className="description">{project.description}</p>
					</div>

					<div className="button-actions">
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
