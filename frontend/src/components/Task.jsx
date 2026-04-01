export default function Task({ task, setTasks, tasks }) {
	const date = new Date(task.createdAt);

	const handleStatusChange = async (taskId, newStatus) => {
		const { data } = await client.put(`/${taskId}`, {
			status: newStatus,
		});

		setTasks(tasks.map((t) => (t._id === taskId ? data : t)));
	};

	const handleDelete = async (taskId) => {
		await client.delete(`/${taskId}`);
		setTasks(tasks.filter((t) => t._id !== taskId));
	};

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
					onChange={(e) => handleStatusChange(task._id, e.target.value)}
				>
					<option>To Do</option>
					<option>In Progress</option>
					<option>Done</option>
				</select>

				<div id="card-actions">
					{/* <button
						className="viewBtn"
						onClick={handleViewDetails}
					>
						<img
							src="/src/components/icons/view.svg"
							alt="View icon"
						/>
						View
					</button> */}
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
						onClick={() => handleDelete(task._id)}
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
