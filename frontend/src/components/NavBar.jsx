import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function NavBar() {
	const { user, setUser, loading, logout } = useUser(); // bring in user info from context
	if (loading) return null; // avoid default flicker

	// const handleImageClick = async () => {
	// 	const newUrl = prompt("Enter image URL to change your profile picture! Accepted file types are jpg, jpeg, png, and gif.");
	// 	if (!newUrl) return;

	// 	// validate common image file extensions
	// 	const validExtensions = [".jpg", ".jpeg", ".png", ".gif"];
	// 	const extension = new URL(newUrl).pathname.split(".").pop().toLowerCase();
	// 	if (!validExtensions.includes(`.${extension}`)) {
	// 		return alert("Please enter a valid image URL with an appropriate file extension!");
	// 	}

	// 	try {
	// 		const { data } = await userClient.put("/profile-image", {
	// 			profileImage: newUrl,
	// 		});

	// 		setUser(data); // update instantly
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	return (
		<>
			{user ? (
				<header>
					<nav>
						<ul>
							<li>
								<Link to="/dashboard">Dashboard</Link>
							</li>
							<li onClick={logout}>
								<Link to="/login">Logout</Link>
							</li>
						</ul>
						{user && (
							<li id="user-section">
								<div>Welcome, {user.username}!</div>
								<img
									src={user?.profileImage || "/images/default-avatar.png"}
									alt="user profile picture"
									// onClick={handleImageClick}
									id="profileImage"
								/>
							</li>
						)}
					</nav>
				</header>
			) : null}
		</>
	);
}
