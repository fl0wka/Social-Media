import { createSlice } from "@reduxjs/toolkit"
import * as AuthApi from "../api/AuthRequest"
import * as localStorage from "../utils/localStorage"

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
			localStorage.save({ ...action?.payload }, "profile")
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
		dispatch(authReceived(data))
	} catch (error) {
		dispatch(authRequestFailed())
	}
}

export const signUp = formData => async dispatch => {
	dispatch(authRequested())
	try {
		const { data } = await AuthApi.signUp(formData)
		dispatch(authReceived(data))
	} catch (error) {
		dispatch(authRequestFailed())
	}
}

export const getLoadingStatus = () => state => state.auth.loading
export const getUser = () => state => state.auth.authData

export default authReducer
