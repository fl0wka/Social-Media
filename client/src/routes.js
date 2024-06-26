import Auth from "./pages/Auth/Auth"
import Chat from "./pages/Chat/Chat"
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
	{
		path: `profile/:id`,
		element: user ? <Profile /> : <Navigate to="../auth" />,
	},
	{ path: "chat", element: user ? <Chat /> : <Navigate to="../auth" /> },
	{ path: "*", element: <Navigate to="" /> },
]
