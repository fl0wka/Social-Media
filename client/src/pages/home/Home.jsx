import React from "react"
import ProfileSide from "../../components/profileSide/ProfileSide"
import PostSide from "../../components/PostSide/PostSide"
import "./Home.css"

const Home = () => {
	return (
		<div className="Home">
			<ProfileSide />
			<PostSide />
			<div className="rightSide">Right Side</div>
		</div>
	)
}

export default Home
