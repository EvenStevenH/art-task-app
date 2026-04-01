export default function Task({ task }) {
	const date = new Date(task.createdAt);

	return (
		<div className="task">
			<h3>{task.title}</h3>
			<p>Status: {task.status}</p>
			<div>
				{date.toLocaleDateString()} {date.toLocaleTimeString()}
			</div>
			<p>{task.description}</p>
		</div>
	);
}