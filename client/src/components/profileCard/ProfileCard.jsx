import React from "react"
import "./ProfileCard.css"
import Cover from "../../img/cover.jpg"
import Profile from "../../img/profileImg.jpg"

const ProfileCard = () => {
	const ProfilePage = true
	return (
		<div className="ProfileCard">
			<div className="ProfileImage">
				<img src={Cover} alt="img" />
				<img src={Profile} alt="img" />
			</div>

			<div className="ProfileName">
				<span>Unknown</span>
				<span>Junior Frontend Developer</span>
			</div>

			<div className="followStatus">
				<hr />
				<div>
					<div className="follow">
						<span>6,890</span>
						<span>Followings</span>
					</div>
					<div className="vl"></div>
					<div className="follow">
						<span>2</span>
						<span>Followers</span>
					</div>

					{ProfilePage && (
						<>
							<div className="vl"></div>
							<div className="follow">
								<span>3</span>
								<span>Posts</span>
							</div>
						</>
					)}
				</div>
				<hr />
			</div>

			{ProfileCard ? "" : <span>My Profile</span>}
		</div>
	)
}

export default ProfileCard
