import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Project({ project, onEdit, onDelete, isInDashboard }) {
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(project.title);
	const [description, setDescription] = useState(project.description);
	const [image, setImage] = useState(project.image);
	const navigate = useNavigate();
	const date = new Date(project.createdAt);

	const handleEditSubmit = (e) => {
		e.preventDefault();
		onEdit(e, project._id, title, description, image);
		setIsEditing(false);
	};

	return (
		<>
			{isEditing ? (
				<form
					className="edit-form"
					onSubmit={handleEditSubmit}
				>
					<label htmlFor="project-title">Title:</label>
					<div id="edit-form-input">
						<input
							type="text"
							id="project-title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder={project.title || `Project Title`}
							required
							autoFocus
						/>

						<label htmlFor="project-description">Description:</label>
						<textarea
							id="project-description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder={project.description || `About my project...`}
						/>

						<label htmlFor="project-image-link">Image (optional):</label>
						<input
							id="project-image-link"
							value={image}
							onChange={(e) => setImage(e.target.value)}
							placeholder={project.image || `https://domain.com/image.jpg`}
						/>
					</div>

					<div className="button-actions">
						<button
							className="editSaveBtn"
							type="submit"
						>
							{/* <img
									src="/src/components/icons/save.svg"
									alt="Save icon"
								/> */}
							<span className="material-symbols-outlined">check</span>
							Save
						</button>
						<button onClick={() => setIsEditing(!isEditing)}>
							{/* <img
									src="/src/components/icons/cancel.svg"
									alt="Cancel icon"
								/> */}
							<span className="material-symbols-outlined">close</span>
							Cancel
						</button>
					</div>
				</form>
			) : (
				<>
					<img
						id="project-image"
						src={project.image || "/images/default-banner.png"}
						alt={`${project.title}'s project image`}
						onClick={() => {
							isInDashboard ? navigate(`/projects/${project._id}/tasks`) : null;
						}}
					/>

					<div id="project-info">
						<div>
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
								onClick={() => {
									isInDashboard ? navigate(`/projects/${project._id}/tasks`) : navigate(`/dashboard`);
								}}
							>
								{/* <img
									src="/src/components/icons/view.svg"
									alt="View icon"
								/> */}
								<span className="material-symbols-outlined">view_kanban</span>
								{isInDashboard ? `View` : `Dashboard`}
							</button>
							<button
								className="editBtn"
								onClick={() => setIsEditing(!isEditing)}
							>
								{/* <img
									src="/src/components/icons/edit.svg"
									alt="Edit icon"
								/> */}
								<span className="material-symbols-outlined">edit_document</span>
								Edit
							</button>
							<button
								className="deleteBtn"
								onClick={() => onDelete(project._id)}
							>
								{/* <img
									src="/src/components/icons/delete.svg"
									alt="Delete icon"
								/> */}
								<span className="material-symbols-outlined">delete</span>
								Delete
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
}
