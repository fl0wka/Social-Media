import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const secret = process.env.JWT_KEY
const authMiddleWare = async (req, res, next) => {
	console.log(req.headers.authorization) // return undefined

	try {
		const token = req.headers.authorization.split(" ")[1]
		console.log(token)
		if (token) {
			// Проверка соответствия токена со значением в .env
			const decoded = jwt.verify(token, secret)
			console.log(decoded)
			req.body._id = decoded?.id
		}
		next()
	} catch (error) {
		console.log(error.message)
	}
}

export default authMiddleWare
