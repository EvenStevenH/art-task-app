import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { token, userClient } from "../clients/api";

const UserContext = createContext(null);

// custom provider to wrap App
export function UserProvider({ children }) {
	const [user, setUser] = useState(null); // initially null
	const [loading, setLoading] = useState(true); // prevent flicker/reset behavior
	const navigate = useNavigate();

	useEffect(() => {
		async function getUser() {
			try {
				if (!token()) {
					setLoading(false);
					return; // no token? > skip steps
				}

				const { data } = await userClient.get("/"); // use token to verify user (ex. valid? expired?)
				setUser(data); // token legit? > take user data > save to state
			} catch (error) {
				console.log(error);
				logout(); // if verification fails, logout user
			} finally {
				setLoading(false);
			}
		}
		getUser(); // verifies token > retrieves user data
	}, []);

	function logout() {
		setUser(null); // clear the user state
		localStorage.removeItem("token"); // clear the local storage

		navigate("/login"); // navigate the user back to login
	}

	const value = {
		user,
		setUser,
		logout,
		loading,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// custom hook to easily access context value
export function useUser() {
	return useContext(UserContext);
}
