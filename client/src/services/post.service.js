import axios from "axios"
import configFile from "../config.json"

const httpPost = axios.create({
	baseURL: configFile.apiEndpoint + "post/",
})

const postService = {
	timeline: async userId => {
		const { data } = await httpPost.get(`${userId}/timeline`)
		return data
	},
	likePost: async (postId, userId) => {
		return await httpPost.put(`${postId}/like`, { userId: userId })
	},
}

export default postService
