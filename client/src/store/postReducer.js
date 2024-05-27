import { createSlice } from "@reduxjs/toolkit"
import uploadService from "../services/upload.service"
import postService from "../services/post.service"

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
			state.loading = true
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
		timelinePostsRequested: state => {
			state.loading = true
			state.error = false
		},
		timelinePostsReceived: (state, action) => {
			state.loading = false
			state.error = false
			state.posts = [...action.payload]
		},
		timelinePostsRequestFailed: state => {
			state.loading = false
			state.error = true
		},
	},
})

const { reducer: postReducer, actions } = postSlice
const {
	uploadRequested,
	uploadReceived,
	uploadRequestFailed,
	timelinePostsRequested,
	timelinePostsReceived,
	timelinePostsRequestFailed,
} = actions

export const uploadPost = data => async dispatch => {
	dispatch(uploadRequested())
	try {
		const newPost = await uploadService.post(data)
		dispatch(uploadReceived(newPost))
	} catch (error) {
		console.log(error)
		dispatch(uploadRequestFailed())
	}
}

export const timelinePosts = userId => async dispatch => {
	dispatch(timelinePostsRequested())
	try {
		const data = await postService.timeline(userId)
		dispatch(timelinePostsReceived(data))
	} catch (error) {
		dispatch(timelinePostsRequestFailed())
	}
}

export const getUploadStatus = () => state => state.posts.uploading
export const getLoadingStatus = () => state => state.posts.loading
export const getPosts = () => state => state.posts.posts

export default postReducer
