import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Footer() {
	const { user } = useUser(); // bring in user info from context

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
					<Link to="/dashboard">
						<button id="backBtn">
							<img
								src="/src/components/icons/back.svg"
								alt="Back icon"
							/>
							Dashboard
						</button>
					</Link>

					<button
						id="backToTopBtn"
						onClick={scrollToTop}
					>
						<img
							src="/src/components/icons/top.svg"
							alt="Top icon"
						/>
						Back to Top
					</button>
				</footer>
			) : null}
		</>
	);
}
