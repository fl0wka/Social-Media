import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "."
import customLocalStorage from "../utils/localStorage"

const persistedState = customLocalStorage.load("store")

const store = configureStore({
	reducer: rootReducer,
	preloadedState: persistedState,
})

store.subscribe(() => customLocalStorage.save(store.getState(), "store"))

export default store
