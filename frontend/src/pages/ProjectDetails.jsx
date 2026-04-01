import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { taskClient } from "../clients/api";
import Task from "../components/Task";

export default function ProjectTasks() {
	const { projectId } = useParams();
	const [tasks, setTasks] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState("To Do");
	const client = taskClient(projectId);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchTasks() {
			try {
				const { data } = await client.get("/");
				setTasks(data);
			} catch (err) {
				console.log(err.response.data);
			} finally {
				setLoading(false); // hide loading once the data is fetched
			}
		}
		fetchTasks();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await client.post("/", {
				title,
				description,
				status,
			});

			// reset the form
			setTasks([data, ...tasks]);
			setTitle("");
			setDescription("");
			setStatus("To Do");
		} catch (err) {
			console.log(err);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<button>
				<Link to="/dashboard">Back to Dashboard</Link>
			</button>

			<h1>Project Tasks</h1>

			<form
				id="project-form"
				onSubmit={handleSubmit}
			>
				<h2>Create a new task!</h2>

				<label htmlFor="task-title">Title:</label>
				<input
					type="text"
					id="task-title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Task title"
					required
				/>

				<label htmlFor="task-description">Description:</label>
				<textarea
					type="text"
					id="task-description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="About my task..."
				/>

				<label htmlFor="task-status">Description:</label>
				<select
					id="task-status"
					value={status}
					onChange={(e) => setStatus(e.target.value)}
				>
					<option>To Do</option>
					<option>In Progress</option>
					<option>Done</option>
				</select>

				<button>Add Task</button>
			</form>

			<div className="grid">
				{tasks.map((task) => (
					<>
						<Task
							task={task}
							tasks={tasks}
							key={task._id}
							setTasks={setTasks}
						/>
					</>
				))}
			</div>
		</div>
	);
}
