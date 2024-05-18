import React from "react"
import Logo from "../../img/logo.png"
import "./AuthWebName.css"

const AuthWebName = () => {
	return (
		<div className="a-left">
			<img src={Logo} alt="" />
			<div className="Webname">
				<h1>Soc Media</h1>
				<h6>Explore the ideas throughout the world</h6>
			</div>
		</div>
	)
}

export default AuthWebName
