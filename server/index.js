// ('import ... from ...', вместо 'const ... require ...') задается в package.json строкой "type": "module"

import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

// Routes
import AuthRoute from "./Routes/AuthRoute.js"
import UserRoute from "./Routes/UserRoute.js"
import PostRoute from "./Routes/PostRoute.js"
import UploadRoute from "./Routes/UploadRoute.js"
import ChatRoute from "./Routes/ChatRoute.js"

const app = express()

// to serve images for public
app.use(express.static("public"))
app.use("/images", express.static("images"))

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

dotenv.config()

// Подключение к БД и прослушивание App
mongoose
	.connect(process.env.MONGO_DB)
	.then(() =>
		app.listen(process.env.PORT, () =>
			console.log(`Listening at ${process.env.PORT}`)
		)
	)
	.catch(err => console.log(err))

// Usage of routes
app.use("/auth", AuthRoute)
app.use("/user", UserRoute)
app.use("/post", PostRoute)
app.use("/upload", UploadRoute)
app.use("/chat", ChatRoute)
