import React, { useState } from "react"
import "./User.css"
import { useDispatch, useSelector } from "react-redux"
import { followUser, getUser, unFollowUser } from "../../store/authReducer"

const User = ({ person }) => {
	const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
	const dispatch = useDispatch()
	const { user: currentUser } = useSelector(getUser())
	const [following, setFollowing] = useState(
		currentUser.following.includes(person._id)
	)

	const handleFollow = () => {
		following
			? dispatch(unFollowUser(person._id, currentUser))
			: dispatch(followUser(person._id, currentUser))

		setFollowing(prev => !prev)
	}

	return (
		<div className="follower">
			<div>
				<img
					src={
						person.profilePicture
							? serverPublic + person.profilePicture
							: serverPublic + "defaultProfile.jpg"
					}
					alt=""
					className="followerImage"
				/>
				<div className="name">
					<span>{person.firstname}</span>
					<span>{person.username}</span>
				</div>
			</div>
			<button
				className={
					following ? "button fc-button unfollowButton" : "button fc-button"
				}
				onClick={handleFollow}
			>
				{following ? "Unfollow" : "Follow"}
			</button>
		</div>
	)
}

export default User
