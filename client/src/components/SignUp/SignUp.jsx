import React from "react"
import "../SignIn/SignIn.css"

const SignUp = () => {
	return (
		<div className="a-right">
			<form className="infoForm authForm">
				<h3>Sign up</h3>
				<div>
					<input
						type="text"
						placeholder="First Name"
						className="infoInput"
						name="firstname"
					/>
					<input
						type="text"
						placeholder="Last Name"
						className="infoInput"
						name="lastname"
					/>
				</div>

				<div>
					<input
						type="text"
						placeholder="Username"
						className="infoInput"
						name="username"
					/>
				</div>

				<div>
					<input
						type="text"
						placeholder="Password"
						className="infoInput"
						name="password"
					/>
					<input
						type="text"
						placeholder="Confirm Password"
						className="infoInput"
						name="confirmpass"
					/>
				</div>

				<div>
					<span style={{ fontSize: "12px" }}>
						Already have an account. Login!
					</span>
				</div>
				<button className="button infoButton" type="sumbit">
					Signup
				</button>
			</form>
		</div>
	)
}

export default SignUp
