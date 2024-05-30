import React from "react"
import "./ProfileSide.css"
import LogoSearch from "../LogoSearch/LogoSearch"
import ProfileCard from "../profileCard/ProfileCard"
import FollowersCard from "../followersCard/FollowersCard"

function ProfileSide() {
	return (
		<div className="ProfileSide">
			<LogoSearch />
			<ProfileCard location="homePage" />
			<FollowersCard />
		</div>
	)
}

export default ProfileSide
