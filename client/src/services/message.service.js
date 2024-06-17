import axios from "axios"
import configFile from "../config.json"

const httpMessage = axios.create({
	baseURL: configFile.apiEndpoint + "message/",
})

const messageService = {
	get: async chatId => {
		const { data } = await httpMessage.get(`${chatId}`)
		return data
	},
}

export default messageService
