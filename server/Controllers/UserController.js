import UserModel from '../Models/userModel.js'
import bcrypt from 'bcrypt'

// Get a User
export const getUser = async (req, res) => {
	// вытащим значение id из params
	const id = req.params.id

	// проверка на существование User'а
	try {
		const user = await UserModel.findById(id)

		if (user) {
			// исключаем из ответа password
			// в полученном объекте user, искомые данные находятся в ключе _doc
			const { password, ...otherDetails } = user._doc

			res.status(200).json(otherDetails)
		} else {
			res.status(404).json('not such user exist')
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Update a User
export const updateUser = async (req, res) => {
	const id = req.params.id
	// currentUserId - сценарий, когда пользователь обновляет свой профиль
	// currentUserAdminStatus - сценарий, когда админ обновляет пользователя
	// в тестовых запросах Postman в "body" нужно передавать не только ключ/значение, которое будет изменено, но "currentUserId" и "currentUserAdminStatus"
	const { currentUserId, currentUserAdminStatus, password } = req.body

	if (currentUserId === id || currentUserAdminStatus) {
		try {
			if (password) {
				// Прежде чем изменить пароль, хэшируем новое значение и записываем его
				const salt = await bcrypt.genSalt(10)
				req.body.password = await bcrypt.hash(password, salt)
			}

			const user = await UserModel.findByIdAndUpdate(id, req.body, {
				new: true,
			})

			res.status(200).json(user)
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	} else {
		res.status(403).json('Access Denied! You can only update your own profile')
	}
}

// Delete User
export const deleteUser = async (req, res) => {
	const id = req.params.id

	const { currentUserId, currentUserAdminStatus } = req.body

	if (currentUserId === id || currentUserAdminStatus) {
		try {
			await UserModel.findByIdAndDelete(id)
			res.status(200).json('User deleted successfully')
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	} else {
		req.status(403).json('Access Denied! You can only deleted your own profile')
	}
}

// Follow a User
