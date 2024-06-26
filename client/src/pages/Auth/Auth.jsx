import React, { useState } from "react"
import "./Auth.css"
import AuthWebName from "../../components/AuthWebName/AuthWebName"
import AuthForm from "../../components/AuthForm/AuthForm"
import { useDispatch, useSelector } from "react-redux"
import { getLoadingStatus, logIn, signUp } from "../../store/authReducer"

const Auth = () => {
	const initialState = {
		firstname: "",
		lastname: "",
		username: "",
		password: "",
		confirmpass: "",
	}
	const [isSignUp, setIsSignUp] = useState(false)
	const dispatch = useDispatch()
	const loadingStatus = useSelector(getLoadingStatus())
	const [data, setData] = useState(initialState)

	const handleChange = e => {
		setData({ ...data, [e.target.name]: e.target.value })
	}
	const [isConfirmPass, setIsConfirmPass] = useState(true)
	const handleSubmit = e => {
		e.preventDefault()

		// Делаем проверку совпадения введенных значений полей "password" и "confirmpass"
		if (isSignUp) {
			data.password === data.confirmpass
				? dispatch(signUp(data))
				: setIsConfirmPass(false)
		} else {
			dispatch(logIn(data))
		}
	}
	const resetForm = () => {
		setIsConfirmPass(true)
		setData(initialState)
	}

	return (
		<div className="Auth">
			{/* Left Side */}
			<AuthWebName />

			{/* Right Side */}
			<AuthForm
				data={data}
				isSignUp={isSignUp}
				isConfirmPass={isConfirmPass}
				loadingStatus={loadingStatus}
				setIsSignUp={setIsSignUp}
				onChange={handleChange}
				onSubmit={handleSubmit}
				resetForm={resetForm}
				firstName="firstname"
				lastName="lastname"
				userName="username"
				password="password"
				confirmPass="confirmpass"
			/>
		</div>
	)
}

export default Auth
