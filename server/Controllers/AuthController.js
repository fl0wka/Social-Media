import UserModel from '../Models/userModel.js'
import bcrypt, { compare } from 'bcrypt'

// Registering a new User
export const registerUser = async (req, res) => {
	const { username, password, firstname, lastname } = req.body

	// Количество хэширования, количество изменений в строке
	const salt = await bcrypt.genSalt(10)
	// Хэшируем пароль
	const hashedPass = await bcrypt.hash(password, salt)

	const newUser = new UserModel({
		username,
		password: hashedPass,
		firstname,
		lastname,
	})

	// Обращение к серверу делаем через try/catch
	// Сохраним пользователя в БД
	try {
		await newUser.save()
		// Возвращаем статус 200 и само значение в формате json при удачном исполнении
		res.status(200).json(newUser)
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

			validity
				? res.status(200).json(user)
				: res.status(400).json('Wrong password')
		} else {
			res.status(404).json('User does not exist')
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
