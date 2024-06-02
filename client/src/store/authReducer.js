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
} = actions

export const logIn = formData => async dispatch => {
	dispatch(authRequested())
	try {
		const data = await authService.login(formData)
		dispatch(authReceived(data))
	} catch (error) {
		dispatch(authRequestFailed())
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

export const getLoadingStatus = () => state => state.auth.loading
export const getUser = () => state => state.auth.authData

export default authReducer
