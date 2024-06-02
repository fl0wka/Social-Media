import { createAction, createSlice } from "@reduxjs/toolkit"
import authService from "../services/auth.service"
import customLocalStorage from "../utils/localStorage"
import userService from "../services/user.service"

const initialState = {
	authData: null,
	loading: false,
	updateLoading: false,
	error: false,
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		authRequested: state => {
			state.loading = true
			state.error = false
		},
		authReceived: (state, action) => {
			state.authData = action.payload
			state.loading = false
			state.error = false
			customLocalStorage.save({ ...action?.payload }, "profile")
		},
		authRequestFailed: state => {
			state.loading = false
			state.error = true
		},
		updateUserRequested: state => {
			state.updateLoading = true
			state.error = false
		},
		updatedUserSuccess: (state, action) => {
			state.authData = action.payload
			state.updateLoading = false
			state.error = false
			customLocalStorage.save({ ...action?.payload }, "profile")
		},
		updateUserFailed: state => {
			state.updateLoading = false
			state.error = true
		},
		loggedOut: state => {
			state.authData = null
			state.loading = false
			state.error = false
		},
		followUserSuccess: (state, action) => {
			state.authData.user.following.push(action.payload)
		},
		unFollowUserSuccess: (state, action) => {
			const updateFollowing = state.authData.user.following.filter(
				item => item !== action.payload
			)
			state.authData.user.following = [...updateFollowing]
		},
	},
})

const { reducer: authReducer, actions } = authSlice
const {
	authRequested,
	authReceived,
	authRequestFailed,
	updateUserRequested,
	updatedUserSuccess,
	updateUserFailed,
	loggedOut,
	followUserSuccess,
	unFollowUserSuccess,
} = actions

const followUserRequested = createAction("followUserRequested")
const followUserFailed = createAction("followUserFailed")
const unFollowUserRequested = createAction("unFollowUserRequested")
const unFollowUserFailed = createAction("unFollowUserFailed")

export const logIn = formData => async dispatch => {
	dispatch(authRequested())
	try {
		const data = await authService.login(formData)
		dispatch(authReceived(data))
	} catch (error) {
		dispatch(authRequestFailed(error))
	}
}

export const signUp = formData => async dispatch => {
	dispatch(authRequested())
	try {
		const data = await authService.register(formData)
		dispatch(authReceived(data))
	} catch (error) {
		dispatch(authRequestFailed())
	}
}

export const logOut = () => dispatch => {
	localStorage.clear()
	dispatch(loggedOut())
}

export const updateUser = (id, formData) => async dispatch => {
	dispatch(updateUserRequested())
	try {
		const data = await userService.update(id, formData)
		dispatch(updatedUserSuccess(data))
	} catch (error) {
		dispatch(updateUserFailed())
	}
}

export const followUser = (id, currentUser) => async dispatch => {
	dispatch(followUserRequested())
	try {
		await userService.follow(id, currentUser)
		dispatch(followUserSuccess(id))
	} catch (error) {
		dispatch(followUserFailed())
	}
}

export const unFollowUser = (id, currentUser) => async dispatch => {
	dispatch(unFollowUserRequested())
	try {
		await userService.unFollow(id, currentUser)
		dispatch(unFollowUserSuccess(id))
	} catch (error) {
		dispatch(unFollowUserFailed())
	}
}

export const getLoadingStatus = () => state => state.auth.loading
export const getUser = () => state => state.auth.authData

export default authReducer
