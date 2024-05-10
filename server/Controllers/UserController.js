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
export const followUser = async (req, res) => {
	const id = req.params.id

	const { currentUserId } = req.body

	// Проверка того, что пользователь не подписывает сам на себя
	if (currentUserId === id) {
		res.status(403).json('Action forbidden')
	}

	try {
		// User на которого подписываемся
		const followUser = await UserModel.findById(id)
		// User который подписан на тебя
		const followingUser = await UserModel.findById(currentUserId)

		// Проверка существования нашей подписки на этого User'а в его массиве подписавшихся
		if (!followUser.followers.includes(currentUserId)) {
			// Добавление в массив MongoDB осуществляется методом $push
			// Добавление id текущего User'а в массив того, на кого подписываешься
			await followUser.updateOne({ $push: { followers: currentUserId } })
			// Добавление к себе в массив id user'а, на которого подписываешься
			await followingUser.updateOne({ $push: { following: id } })
			res.status(200).json('User followed')
		} else {
			res.status(403).json('User is already followed by you')
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// UnFollow a User
export const unFollowUser = async (req, res) => {
	const id = req.params.id

	const { currentUserId } = req.body

	// Проверка того, что пользователь не пытается отписываться сам от себя
	if (currentUserId === id) {
		res.status(403).json('Action forbidden')
	}

	try {
		// User на которого подписались
		const followUser = await UserModel.findById(id)
		// User который подписан на тебя
		const followingUser = await UserModel.findById(currentUserId)

		// Проверка существования нашей подписки на этого User'а в его массиве подписавшихся
		if (followUser.followers.includes(currentUserId)) {
			// Удаление из массив MongoDB осуществляется методом $pull
			// Удаление id текущего User'а из массив того, на кого подписались
			await followUser.updateOne({ $pull: { followers: currentUserId } })
			// Удаление из своего массива id user'а, на которого подписались
			await followingUser.updateOne({ $pull: { following: id } })
			res.status(200).json('User unfollowed')
		} else {
			res.status(403).json('User is not followed by you')
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
