import { createSlice } from "@reduxjs/toolkit"
import * as UploadApi from "../api/UploadRequest"

const initialState = {
	posts: [],
	loading: false,
	error: false,
	uploading: false,
}

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		uploadRequested: state => {
			state.loading = false
			state.uploading = true
			state.error = false
		},
		uploadReceived: (state, action) => {
			state.loading = false
			state.uploading = false
			state.error = false
			state.posts = [action.payload, ...state.posts]
		},
		uploadRequestFailed: state => {
			state.loading = false
			state.uploading = false
			state.error = true
		},
	},
})

const { reducer: postReducer, actions } = postSlice
const { uploadRequested, uploadReceived, uploadRequestFailed } = actions

export const uploadPost = data => async dispatch => {
	dispatch(uploadRequested())
	try {
		const newPost = await UploadApi.uploadPost(data)
		dispatch(uploadReceived(newPost.data))
	} catch (error) {
		console.log(error)
		dispatch(uploadRequestFailed())
	}
}

export const getUploadStatus = () => state => state.posts.uploading

export default postReducer
