import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "."
import * as localStorage from "../utils/localStorage"

const persistedState = localStorage.load("store")

const store = configureStore({
	reducer: rootReducer,
	preloadedState: persistedState,
})

store.subscribe(() => localStorage.save(store.getState(), "store"))

export default store
