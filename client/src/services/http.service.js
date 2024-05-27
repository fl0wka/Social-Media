import axios from "axios"
import configFile from "../config.json"

axios.defaults.baseURL = configFile.apiEndpoint

const httpService = {
	get: axios.get,
	put: axios.put,
	post: axios.post,
	delete: axios.delete,
	patch: axios.patch,
}

export default httpService
