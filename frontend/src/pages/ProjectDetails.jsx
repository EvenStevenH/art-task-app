import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { taskClient } from "../clients/api";
import Task from "../components/Task";
import Spinner from "../components/Spinner";

export default function ProjectTasks() {
	const { projectId } = useParams();
	const [tasks, setTasks] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState("To Do");
	const client = taskClient(projectId);
	const [isFormVisible, setIsFormVisible] = useState(false);
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
			setIsFormVisible(false);
		} catch (err) {
			console.log(err);
		}
	};

	const handleStatusChange = async (taskId, newStatus) => {
		const { data } = await client.put(`/${taskId}`, {
			status: newStatus,
		});

		setTasks(tasks.map((t) => (t._id === taskId ? data : t)));
	};

	const handleEdit = async (e, taskId, title, description) => {
		e.preventDefault();
		try {
			const { data } = await client.put(`/${taskId}`, { title, description });
			setTasks(tasks.map((task) => (task._id === taskId ? data : task)));
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async (taskId) => {
		await client.delete(`/${taskId}`);
		setTasks(tasks.filter((t) => t._id !== taskId));
	};

	if (loading) return <Spinner />;

	return (
		<main>
			<h1>Project Tasks</h1>

			{tasks.length < 1 && <div className="empty-message">No tasks. Let's create something today!</div>}

			<div className="task-grid">
				{tasks.map((task) => (
					<Task
						task={task}
						tasks={tasks}
						key={task._id}
						setTasks={setTasks}
						onEdit={handleEdit}
						onUpdate={handleStatusChange}
						onDelete={handleDelete}
						client={client}
					/>
				))}

				{!isFormVisible && (
					<button
						className="toggleFormBtn"
						onClick={() => setIsFormVisible(!isFormVisible)}
					>
						<img
							src="/src/components/icons/add.svg"
							alt="Add icon"
						/>
						{tasks.length < 1 ? `Your first task!` : `New Task`}
					</button>
				)}

				{isFormVisible && (
					<form
						className="create-form reveal-animation"
						onSubmit={handleSubmit}
					>
						<h2>Create a new task!</h2>

						<label htmlFor="task-title">Title:</label>
						<input
							type="text"
							id="task-title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="New Task"
							required
							autoFocus
						/>

						<label htmlFor="task-description">Description:</label>
						<textarea
							id="task-description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="About my task..."
						/>

						<label htmlFor="task-status">Status:</label>
						<select
							id="task-status"
							value={status}
							onChange={(e) => setStatus(e.target.value)}
						>
							<option>To Do</option>
							<option>In Progress</option>
							<option>Done</option>
						</select>

						<div className="button-actions">
							<button
								className="addNewBtn"
								type="submit"
							>
								<img
									src="/src/components/icons/add.svg"
									alt="Add icon"
								/>
								Add Task
							</button>
							<button
								type="button"
								onClick={() => setIsFormVisible(false)}
							>
								Cancel
							</button>
						</div>
					</form>
				)}
			</div>

			<Link to="/dashboard">
				<button className="backBtn">
					<img
						src="/src/components/icons/back.svg"
						alt="Back icon"
					/>
					Back to Dashboard
				</button>
			</Link>
		</main>
	);
}
