import httpService from "./http.service"

const uploadService = {
	image: async payload => {
		const { data } = await httpService.post("upload", payload)
		return data
	},
	post: async payload => {
		const { data } = await httpService.post("post", payload)
		return data
	},
}

export default uploadService
