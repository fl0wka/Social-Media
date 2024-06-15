import axios from "axios"
import configFile from "../config.json"

const httpChat = axios.create({
	baseURL: configFile.apiEndpoint + "chat/",
})

const chatService = {
	getAll: async userId => {
		const { data } = await httpChat.get(`${userId}`)
		return data
	},
	// getChatUser: async (firstId, secondId) => {
	// 	const { data } = await httpChat.get(`/find/${firstId}/${secondId}`)
	// 	return data
	// },
}

export default chatService
