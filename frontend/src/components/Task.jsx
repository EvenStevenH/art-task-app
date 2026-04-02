import { useState } from "react";

export default function Task({ task, onUpdate, onDelete, onEdit }) {
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description);

	const date = new Date(task.createdAt);

	const handleEditToggle = () => {
		setIsEditing(!isEditing);
	};

	const handleEditSubmit = (e) => {
		e.preventDefault();
		onEdit(e, task._id, title, description);
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
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder={task.title}
						/>

						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder={task.description}
						/>

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
					<div className="task-info">
						<h3>{task.title}</h3>

						<p className="date">
							{date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
						</p>

						<p className="description">{task.description}</p>
					</div>

					<div>
						<select
							value={task.status}
							onChange={(e) => onUpdate(task._id, e.target.value)}
						>
							<option>To Do</option>
							<option>In Progress</option>
							<option>Done</option>
						</select>
						
						<div className="button-actions">
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
								onClick={() => onDelete(task._id)}
							>
								<img
									src="/src/components/icons/delete.svg"
									alt="Delete icon"
								/>
								Delete
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
