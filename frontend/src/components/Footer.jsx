import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Footer() {
	const { user } = useUser(); // bring in user info from context
	const location = useLocation();
	const isProjectDetails = location.pathname.startsWith("/projects/"); // check if we're on project details page

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<>
			{user ? (
				<footer>
					{isProjectDetails && (
						<Link to="/dashboard">
							<button id="backBtn">
								{/* <img
									src="/src/components/icons/back.svg"
									alt="Back icon"
								/> */}
								<span class="material-symbols-outlined">arrow_back_ios</span>
								Dashboard
							</button>
						</Link>
					)}

					<button
						id="backToTopBtn"
						onClick={scrollToTop}
					>
						{/* <img
							src="/src/components/icons/top.svg"
							alt="Top icon"
						/> */}
						<span class="material-symbols-outlined">arrow_upward</span>
						Back to Top
					</button>
				</footer>
			) : null}
		</>
	);
}
