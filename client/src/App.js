import { useSelector } from "react-redux"
import "./App.css"
import { routes } from "./routes"
import { useRoutes } from "react-router-dom"
import { getUser } from "./store/authReducer"

function App() {
	const { user } = useSelector(getUser()) || {}
	const element = useRoutes(routes(user))

	return (
		<div className="App">
			<div className="blur" style={{ top: "-18%", right: "0" }}></div>
			<div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
			{element}
		</div>
	)
}

export default App
