import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { taskClient, projectClient } from "../clients/api";
import { useNavigate } from "react-router-dom";
import Project from "../components/Project";
import Task from "../components/Task";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";

export default function ProjectTasks() {
	const { projectId } = useParams();
	const [tasks, setTasks] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState("To Do");
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const client = taskClient(projectId);
	const navigate = useNavigate();

	const [project, setProject] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const [tasksRes, projectRes] = await Promise.all([client.get("/"), projectClient.get(`/${projectId}`)]);
				setTasks(tasksRes.data);
				setProject(projectRes.data);
			} catch (err) {
				console.log(err.response?.data || err);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [projectId]);

	const handleProjectEdit = async (e, projectId, title, description) => {
		e.preventDefault();
		try {
			await projectClient.put(`/${projectId}`, { title, description });
			setProject({ ...project, title, description }); // Update only the current project
		} catch (error) {
			console.error(error);
		}
	};

	const handleProjectDelete = async (projectId) => {
		if (window.confirm("Are you sure you want to delete this project?")) {
			try {
				await projectClient.delete(`/${projectId}`);
				navigate("/dashboard");
			} catch (error) {
				console.error(error);
			}
		}
	};

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
	if (!project) return <div>Project not found.</div>;

	return (
		<main>
			<h1>{project.title}</h1>

			<Project
				project={project}
				onEdit={handleProjectEdit}
				onDelete={handleProjectDelete}
				isInDashboard={false}
				id="project-info-card"
			/>

			<h2>Tasks</h2>

			{tasks.length < 1 && <div className="empty-message">No tasks... yet. One step at a time!</div>}

			<div
				className="grid"
				id="task-grid"
			>
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
							src="/src/components/icons/add_beige.svg"
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
						<h3>Create a new task!</h3>

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
									src="/src/components/icons/add_white.svg"
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

			<Footer />
		</main>
	);
}
