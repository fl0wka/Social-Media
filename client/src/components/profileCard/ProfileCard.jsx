import React from "react"
import "./ProfileCard.css"
import { useSelector } from "react-redux"
import { getUser } from "../../store/authReducer"
import { Link } from "react-router-dom"
import { getPosts } from "../../store/postReducer"

const ProfileCard = ({ location }) => {
	const { user } = useSelector(getUser())
	const posts = useSelector(getPosts())
	const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

	return (
		<div className="ProfileCard">
			<div className="ProfileImage">
				<img
					src={
						user.coverPicture
							? serverPublic + user.coverPicture
							: serverPublic + "defaultCover.jpg"
					}
					alt=""
				/>
				<img
					src={
						user.profilePicture
							? serverPublic + user.profilePicture
							: serverPublic + "defaultProfile.jpg"
					}
					alt=""
				/>
			</div>

			<div className="ProfileName">
				<span>
					{user.firstname} {user.lastname}
				</span>
				<span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
			</div>

			<div className="followStatus">
				<hr />
				<div>
					<div className="follow">
						<span>{user.following.length}</span>
						<span>Following</span>
					</div>
					<div className="vl"></div>
					<div className="follow">
						<span>{user.followers.length}</span>
						<span>Followers</span>
					</div>

					{location === "profilePage" && (
						<>
							<div className="vl"></div>
							<div className="follow">
								<span>
									{posts.filter(post => post.userId === user._id).length}
								</span>
								<span>Posts</span>
							</div>
						</>
					)}
				</div>
				<hr />
			</div>

			{location === "profilePage" ? (
				""
			) : (
				<span>
					<Link
						style={{ textDecoration: "none", color: "inherit" }}
						to={`/profile/${user._id}`}
					>
						My Profile
					</Link>
				</span>
			)}
		</div>
	)
}

export default ProfileCard
