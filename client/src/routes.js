import Auth from "./pages/Auth/Auth"
import Home from "./pages/home/Home"
import Profile from "./pages/Profile/Profile"
import { Navigate } from "react-router-dom"

export const routes = user => [
	{
		path: "/",
		element: user ? <Navigate to="home" /> : <Navigate to="auth" />,
	},
	{
		path: "home",
		element: user ? <Home /> : <Navigate to="../auth" />,
	},
	{ path: "auth", element: user ? <Navigate to="../home" /> : <Auth /> },
	{ path: "*", element: <Navigate to="" /> },
]
