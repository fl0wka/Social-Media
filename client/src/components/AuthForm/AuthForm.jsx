import React from "react"
import "./AuthForm.css"

const AuthForm = ({
	data,
	isSignUp,
	isConfirmPass,
	loadingStatus,
	setIsSignUp,
	onChange,
	onSubmit,
	resetForm,
	firstName,
	lastName,
	userName,
	password,
	confirmPass,
}) => {
	return (
		<div className="a-right">
			<form className="infoForm authForm" onSubmit={onSubmit}>
				<h3>{isSignUp ? "Sign up" : "Log In"}</h3>

				{isSignUp && (
					<div>
						<input
							type="text"
							placeholder="First Name"
							className="infoInput"
							name={firstName}
							onChange={onChange}
							value={data[firstName]}
						/>
						<input
							type="text"
							placeholder="Last Name"
							className="infoInput"
							name={lastName}
							onChange={onChange}
							value={data[lastName]}
						/>
					</div>
				)}

				<div>
					<input
						type="text"
						placeholder="Username"
						className="infoInput"
						name={userName}
						onChange={onChange}
						value={data[userName]}
					/>
				</div>

				<div>
					<input
						type="password"
						placeholder="Password"
						className="infoInput"
						name={password}
						onChange={onChange}
						value={data[password]}
					/>
					{isSignUp && (
						<input
							type="password"
							placeholder="Confirm Password"
							className="infoInput"
							name={confirmPass}
							onChange={onChange}
							value={data[confirmPass]}
						/>
					)}
				</div>

				{isSignUp && (
					<span
						className="confirmPassError"
						style={{ display: isConfirmPass ? "none" : "block" }}
					>
						* Confirm Password is not same
					</span>
				)}

				<div>
					<span
						style={{ fontSize: "12px", cursor: "pointer" }}
						onClick={() => {
							setIsSignUp(prev => !prev)
							resetForm()
						}}
					>
						{isSignUp
							? "Already have an account. Login!"
							: "Don't have an account. Sign up"}
					</span>
					<button className="button infoButton" type="sumbit">
						{loadingStatus ? "...Loading" : isSignUp ? "Sign up" : "Log In"}
					</button>
				</div>
			</form>
		</div>
	)
}

export default AuthForm
