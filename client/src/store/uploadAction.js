import uploadService from "../services/upload.service"

export const uploadImage = data => async dispatch => {
	try {
		await uploadService.image(data)
	} catch (error) {
		console.log(error.message)
	}
}
