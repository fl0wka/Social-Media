import React from "react"
import "./Auth.css"
import AuthWebName from "../../components/AuthWebName/AuthWebName"
import SignIn from "../../components/SignIn/SignIn"
import SignUp from "../../components/SignUp/SignUp"

const Auth = () => {
	return (
		<div className="Auth">
			<AuthWebName />
			{/* <SignUp /> */}
			<SignIn />
		</div>
	)
}

export default Auth
