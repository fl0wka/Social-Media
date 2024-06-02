import React, { useEffect, useState } from "react"
import { useDisclosure } from "@mantine/hooks"
import { UilPen } from "@iconscout/react-unicons"
import "./InfoCard.css"
import ProfileModal from "../ProfileModal/ProfileModal"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getUser, logOut } from "../../store/authReducer"
import userService from "../../services/user.service"

const InfoCard = () => {
	const [opened, { open, close }] = useDisclosure(false)
	const redirectUrl = "/auth"

	const dispatch = useDispatch()
	const params = useParams()

	const profileUserId = params.id
	const [profileUser, setProfileUser] = useState({})

	const { user } = useSelector(getUser())

	const handleLogOut = () => {
		dispatch(logOut())
	}

	useEffect(() => {
		const fetchProfileUser = async () => {
			if (profileUserId === user._id) {
				setProfileUser(user)
			} else {
				const profileUser = await userService.get(profileUserId)
				setProfileUser(profileUser)
			}
		}
		fetchProfileUser()
	}, [user])

	return (
		<div className="InfoCard">
			<div className="infoHead">
				<h4>Profile Info</h4>
				{profileUserId === user._id ? (
					<div>
						<UilPen width="2rem" height="1.2rem" onClick={open} />
						<ProfileModal opened={opened} close={close} />
					</div>
				) : (
					""
				)}
			</div>
			<div className="info">
				<span>
					<b>Status </b>
				</span>
				<span>
					{profileUser.relationship
						? profileUser.relationship
						: "not specified"}
				</span>
			</div>
			<div className="info">
				<span>
					<b>Lives in </b>
				</span>
				<span>
					{profileUser.livesIn ? profileUser.livesIn : "not specified"}
				</span>
			</div>
			<div className="info">
				<span>
					<b>Country </b>
				</span>
				<span>
					{profileUser.country ? profileUser.country : "not specified"}
				</span>
			</div>
			<div className="info">
				<span>
					<b>Works at </b>
				</span>
				<span>
					{profileUser.worksAt ? profileUser.worksAt : "not specified"}
				</span>
			</div>
			<button className="button logout-button" onClick={handleLogOut}>
				Logout
			</button>
		</div>
	)
}

export default InfoCard
