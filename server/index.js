// ('import ... from ...', вместо 'const ... require ...') задается в package.json строкой "type": "module"

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import AuthRouter from './Routes/AuthRoute.js'
import UserRouter from './Routes/UserRoute.js'

// Routes

const app = express()

// Middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

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
app.use('/auth', AuthRouter)
app.use('/user', UserRouter)
