export default function Task({ task, onUpdate, onDelete }) {
	const date = new Date(task.createdAt);

	return (
		<div className="card">
			{/* {isEditing ? (
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
			) : ( */}
			<>
				<div className="task-info">
					<h3>{task.title}</h3>
					<p>Status: {task.status}</p>
					<div>
						{date.toLocaleDateString()} {date.toLocaleTimeString()}
					</div>
					<p>{task.description}</p>
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
					{/* <button
						className="editBtn"
						onClick={() => setIsEditing(true)}
					>
						<img
							src="/src/components/icons/edit.svg"
							alt="Edit icon"
						/>
						Edit
					</button> */}
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
			{/* )} */}
		</div>
	);
}
