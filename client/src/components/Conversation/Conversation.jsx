import React, { useEffect, useState } from "react"
import userService from "../../services/user.service"

const Conversation = ({ data, currentUserId, online }) => {
	const [userData, setUserData] = useState(null)

	useEffect(() => {
		// Найдем пользователя с которым общается текущий пользователь
		const userId = data.members.find(id => id !== currentUserId)

		const getUserData = async () => {
			try {
				const data = await userService.get(userId)
				setUserData(data)
			} catch (error) {
				console.log(error)
			}
		}
		getUserData()
	}, [])

	return (
		<>
			<div className="follower conversation">
				<div>
					{online && <div className="online-dot"></div>}
					<img
						src={
							userData?.profilePicture
								? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
								: process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.jpg"
						}
						className="followerImage"
						style={{ width: "50px", height: "50px" }}
						alt=""
					/>
					<div className="name" style={{ fontSize: "0.8rem" }}>
						<span>
							{userData?.firstname} {userData?.lastname}
						</span>
						<span>{online ? "online" : "offline"}</span>
					</div>
				</div>
			</div>
			<hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
		</>
	)
}

export default Conversation
