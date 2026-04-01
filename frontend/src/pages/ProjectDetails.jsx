import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { taskClient } from "../clients/api";

export default function ProjectTasks() {
	const { projectId } = useParams();
	const [tasks, setTasks] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState("To Do");
	const client = taskClient(projectId);

	useEffect(() => {
		async function fetchTasks() {
			const { data } = await client.get("/");
			setTasks(data);
		}
		fetchTasks();
	}, []);

	const handleCreate = async (e) => {
		e.preventDefault();

		const { data } = await client.post("/", {
			title,
			description,
			status,
		});

		setTasks([data, ...tasks]);
		setTitle("");
		setDescription("");
		setStatus("To Do");
	};

	const handleDelete = async (taskId) => {
		await client.delete(`/${taskId}`);
		setTasks(tasks.filter((t) => t._id !== taskId));
	};

	const handleStatusChange = async (taskId, newStatus) => {
		const { data } = await client.put(`/${taskId}`, {
			status: newStatus,
		});

		setTasks(tasks.map((t) => (t._id === taskId ? data : t)));
	};

	return (
		<div>
			<button>
				<Link to="/dashboard">Back to Dashboard</Link>
			</button>

			<h1>Project Tasks</h1>

			<form onSubmit={handleCreate}>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Task title"
					required
				/>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Description"
				/>
				<select
					value={status}
					onChange={(e) => setStatus(e.target.value)}
				>
					<option>To Do</option>
					<option>In Progress</option>
					<option>Done</option>
				</select>
				<button>Add Task</button>
			</form>

			{tasks.map((task) => (
				<div key={task._id}>
					<h3>{task.title}</h3>
					<p>{task.description}</p>

					<select
						value={task.status}
						onChange={(e) => handleStatusChange(task._id, e.target.value)}
					>
						<option>To Do</option>
						<option>In Progress</option>
						<option>Done</option>
					</select>

					<button onClick={() => handleDelete(task._id)}>Delete</button>
				</div>
			))}
		</div>
	);
}
