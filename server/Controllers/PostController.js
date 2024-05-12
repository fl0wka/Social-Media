import PostModel from "../Models/postModel.js"
import UserModel from "../Models/userModel.js"
import mongoose from "mongoose"

// Create new Post
export const createPost = async (req, res) => {
	const newPost = new PostModel(req.body)

	try {
		await newPost.save()
		res.status(200).json("Post created")
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get a post
export const getPost = async (req, res) => {
	const postId = req.params.id

	try {
		const post = await PostModel.findById(postId)

		if (post) {
			res.status(200).json(post)
		} else {
			res.status(404).json("Post not found")
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Update a post
export const updatePost = async (req, res) => {
	const postId = req.params.id
	const { userId } = req.body

	try {
		const post = await PostModel.findById(postId)

		if (post.userId === userId) {
			// Обновление поля в MongoDB осуществляется $set
			await post.updateOne({ $set: req.body })
			res.status(200).json("Post updated")
		} else {
			res.status(403).json("Action forbidden")
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Delete a Post
export const deletePost = async (req, res) => {
	const postId = req.params.id
	const { userId } = req.body

	try {
		const post = await PostModel.findById(postId)

		if (post.userId === userId) {
			await post.deleteOne()
			res.status(200).json("Post deleted successfully")
		} else {
			res.status(403).json("Action forbidden")
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Like/dislike a post
export const likePost = async (req, res) => {
	const postId = req.params.id
	const { userId } = req.body

	try {
		const post = await PostModel.findById(postId)

		// Проверяем пост на наличие нашего лайка в нем и совершаем соответствующие действия
		if (!post.likes.includes(userId)) {
			await post.updateOne({ $push: { likes: userId } })
			res.status(200).json("Post liked")
		} else {
			await post.updateOne({ $pull: { likes: userId } })
			res.status(200).json("Post unliked")
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get TimeLine Posts
export const getTimeLinePosts = async (req, res) => {
	const userId = req.params.id

	try {
		// Ищем все посты текущего пользователя
		const currentUserPosts = await PostModel.find({ userId: userId })

		// Получаем посты тех, на кого подписан текущий пользователь
		// Метод aggregate, простыми словами - последовательность шагов/обращений к БД
		const followingPosts = await UserModel.aggregate([
			{
				// Данный шаг найдет нам в БД объект, содержащий переданный userId
				$match: {
					// Обращаемся к значению типа ObjectId с помощью mongoose следующим образом:
					_id: new mongoose.Types.ObjectId(userId),
				},
			},
			{
				// В данном шаге, находясь в UserModel, мы совершаем поиск по PostModel
				$lookup: {
					// Указываем название папки/коллекции из БД, по которой хотим совершить поиск
					from: "posts",
					/* 
						Здесь указываем поле, которое мы хотим интегрировать с другой моделью. Т.е. following относится к UserModel (коллекция users в БД). Его значения мы используем для поиска. Указав userId в foreignField, мы говорим о том, что взятое значение из following (коллекция users) будет использоваться для поиска в PostModel (коллекция posts в БД) по ключу userId.
					*/
					localField: "following",
					foreignField: "userId",
					// Далее мы указываем, в виде какого объекта мы хотим получить результат
					as: "followingPosts",
				},
			},
			{
				// Далее в шаге, мы возвращаем тип объекта. Т.е. какие поля мы хотим вернуть в результате
				// Результативный объект всегда возвращается с дополнительным ключом _id. Для исключения, достаточно записать в значение 0
				$project: {
					followingPosts: 1,
					_id: 0,
				},
			},
		])
		// В ответе мы соединяем в массив ранее полученный объект постов текущего пользователя и результат aggregate, а затем сортируем по дате от новой до старой публикации
		res.status(200).json(
			currentUserPosts
				.concat(...followingPosts[0].followingPosts)
				.sort((a, b) => {
					return b.createdAt - a.createdAt
				})
		)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
