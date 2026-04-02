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

						<div id="card-actions">
							<button type="submit">Save</button>
							<button onClick={handleEditToggle}>Cancel</button>
						</div>
					</form>
				</>
			) : (
				<>
					<div className="task-info">
						<h3>{task.title}</h3>
						<p>Status: {task.status}</p>
						<p className="date">
							{date.toLocaleDateString()} {date.toLocaleTimeString()}
						</p>
						<p className="description">{task.description}</p>
					</div>

					<select
						value={task.status}
						onChange={(e) => onUpdate(task._id, e.target.value)}
					>
						<option>To Do</option>
						<option>In Progress</option>
						<option>Done</option>
					</select>

					<div id="card-actions">
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
				</>
			)}
		</div>
	);
}
