import axios from "axios"
import configFile from "../config.json"

const httpAuth = axios.create({
	baseURL: configFile.apiEndpoint + "auth/",
})

const authService = {
	login: async payload => {
		const { data } = await httpAuth.post("login", payload)
		return data
	},
	register: async payload => {
		const { data } = await httpAuth.post("register", payload)
		return data
	},
}

export default authService
