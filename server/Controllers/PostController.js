import PostModel from '../Models/postModel.js'
import mongoose from 'mongoose'

// Create new Post
export const createPost = async (req, res) => {
	const newPost = new PostModel(req.body)

	try {
		await newPost.save()
		res.status(200).json('Post created')
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
			res.status(404).json('Post not found')
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
			res.status(200).json('Post updated')
		} else {
			res.status(403).json('Action forbidden')
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
			res.status(200).json('Post deleted successfully')
		} else {
			res.status(403).json('Action forbidden')
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
			res.status(200).json('Post liked')
		} else {
			await post.updateOne({ $pull: { likes: userId } })
			res.status(200).json('Post unliked')
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get TimeLine Posts
export const getTimeLinePosts = async (req, res) => {}
