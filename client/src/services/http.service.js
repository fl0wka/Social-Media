import axios from "axios"
import configFile from "../config.json"

axios.defaults.baseURL = configFile.apiEndpoint

axios.interceptors.request.use(req => {
	const token = JSON.parse(localStorage.getItem("profile")).token

	if (token) {
		req.headers.Authorization = `Bearer ${token}`
	}

	return req
})

const httpService = {
	get: axios.get,
	put: axios.put,
	post: axios.post,
	delete: axios.delete,
	patch: axios.patch,
}

export default httpService
