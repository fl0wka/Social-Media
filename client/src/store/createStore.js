import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import authReducer from "./authReducer"

function saveToLocalStorage(store) {
	try {
		const serializedStore = JSON.stringify(store)
		window.localStorage.setItem("store", serializedStore)
	} catch (error) {
		console.log(error)
	}
}

function loadFromLocalStorage() {
	try {
		const serializedStore = window.localStorage.getItem("store")
		if (serializedStore === null) return undefined
		return JSON.parse(serializedStore)
	} catch (error) {
		console.log(error)
		return undefined
	}
}

const persistedState = loadFromLocalStorage()

const rootReducer = combineReducers({ auth: authReducer })

const store = configureStore({
	reducer: rootReducer,
	preloadedState: persistedState,
})

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
