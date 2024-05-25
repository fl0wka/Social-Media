import UserModel from "../Models/userModel.js"
import bcrypt, { compare } from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (username, id) => {
	return jwt.sign({ username: username, _id: id }, process.env.JWT_KEY, {
		expiresIn: "1h",
	})
}

// Registering a new User
export const registerUser = async (req, res) => {
	// Количество хэширования, количество изменений в строке
	const salt = await bcrypt.genSalt(10)
	// Хэшируем пароль и записываем в поле password
	const hashedPass = await bcrypt.hash(req.body.password, salt)
	req.body.password = hashedPass
	const newUser = new UserModel(req.body)
	const username = req.body.username

	// Обращение к серверу делаем через try/catch
	// Сохраним пользователя в БД
	try {
		const oldUser = await UserModel.findOne({ username })
		// Проверка на существование пользователя
		if (oldUser) {
			return res.status(404).json({ message: "username is already registered" })
		}
		const user = await newUser.save()

		// Создание token'а
		const token = createToken(user.username, user._id)
		// Возвращаем статус 200 и само значение в формате json при удачном исполнении
		res.status(200).json({ user, token })
	} catch (error) {
		// При ошибке возвращаем статус 500 (знач. "ошибка на сервере") и значение ошибки в json формате
		res.status(500).json({ message: error.message })
	}
}

// Login User
export const loginUser = async (req, res) => {
	const { username, password } = req.body

	try {
		const user = await UserModel.findOne({ username: username })

		// Проверка валидности введенного пароля с хэшированным
		if (user) {
			const validity = await bcrypt.compare(password, user.password)

			if (!validity) {
				res.status(400).json({ message: "Wrong password" })
			} else {
				const token = createToken(user.username, user._id)
				res.status(200).json({ user, token })
			}
		} else {
			res.status(404).json("User does not exist")
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
