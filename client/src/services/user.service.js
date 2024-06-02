import axios from "axios"
import configFile from "../config.json"

const httpUser = axios.create({
	baseURL: configFile.apiEndpoint + "user/",
})

const userService = {
	get: async userId => {
		const { data } = await httpUser.get(`${userId}`)
		return data
	},
	update: async (userId, payload) => {
		const { data } = await httpUser.put(`${userId}`, payload)
		return data
	},
	getAll: async () => {
		const { data } = await httpUser.get()
		return data
	},
	follow: async (id, currentUser) => {
		const { data } = await httpUser.put(`${id}/follow`, currentUser)
		return data
	},
	unFollow: async (id, currentUser) => {
		const { data } = await httpUser.put(`${id}/unfollow`, currentUser)
		return data
	},
}

export default userService
