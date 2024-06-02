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
}

export default userService
