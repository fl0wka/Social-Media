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
}

export default postService
