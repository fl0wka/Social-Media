import React, { useEffect, useState } from "react"
import "./FollowersCard.css"

import User from "../User/User"
import { useSelector } from "react-redux"
import { getUser } from "../../store/authReducer"
import userService from "../../services/user.service"

function FollowersCard() {
	const [persons, setPersons] = useState([])
	const { user } = useSelector(getUser())

	useEffect(() => {
		const fetchPersons = async () => {
			const data = await userService.getAll()
			setPersons(data)
		}
		fetchPersons()
	}, [])

	return (
		<div className="FollowersCard">
			<h3>People you may know</h3>

			{persons.map((person, id) => {
				// Exclude the current user
				if (person._id !== user._id) {
					return <User person={person} key={id} />
				}
			})}
		</div>
	)
}

export default FollowersCard
