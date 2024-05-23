import { createSlice } from "@reduxjs/toolkit"
import * as AuthApi from "../api/AuthRequest"

const initialState = { authData: null, loading: false, error: false }

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
		},
		authRequestFailed: state => {
			state.loading = false
			state.error = true
		},
	},
})

const { reducer: authReducer, actions } = authSlice
const { authRequested, authReceived, authRequestFailed } = actions

export const logIn = formData => async dispatch => {
	dispatch(authRequested())
	try {
		const { data } = await AuthApi.logIn(formData)
		// Записываем данные в localStorage
		localStorage.setItem("profile", JSON.stringify({ ...data }))
		dispatch(authReceived(data))
	} catch (error) {
		dispatch(authRequestFailed())
	}
}

export const signUp = formData => async dispatch => {
	dispatch(authRequested())
	try {
		const { data } = await AuthApi.signUp(formData)
		localStorage.setItem("profile", JSON.stringify({ ...data }))
		dispatch(authReceived(data))
	} catch (error) {
		dispatch(authRequestFailed())
	}
}

export const getLoadingStatus = () => state => state.auth.loading

export default authReducer
