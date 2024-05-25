import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "@mantine/core/styles.css"
import { MantineProvider } from "@mantine/core"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from "./store/createStore"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<MantineProvider>
					<App />
				</MantineProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
)
