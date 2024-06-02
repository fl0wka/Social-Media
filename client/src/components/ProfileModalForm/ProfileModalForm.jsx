import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { uploadImage } from "../../store/uploadAction"
import { updateUser } from "../../store/authReducer"

const ProfileModalForm = ({ data, close }) => {
	// Извлекаем пароль из данных
	const { password, ...other } = data
	const [formData, setFormData] = useState(other)
	const [profileImage, setProfileImage] = useState(null)
	const [coverImage, setCoverImage] = useState(null)
	const dispatch = useDispatch()
	const params = useParams()

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const onImageChange = e => {
		if (e.target.files && e.target.files[0]) {
			let img = e.target.files[0]
			e.target.name === "profileImage"
				? setProfileImage(img)
				: setCoverImage(img)
		}
	}

	const handleSubmit = e => {
		e.preventDefault()
		let userData = formData
		if (profileImage) {
			const data = new FormData()
			const fileName = Date.now() + profileImage.name
			data.append("name", fileName)
			data.append("file", profileImage)
			userData.profilePicture = fileName
			try {
				dispatch(uploadImage(data))
			} catch (error) {
				console.log(error)
			}
		}

		if (coverImage) {
			const data = new FormData()
			const fileName = Date.now() + coverImage.name
			data.append("name", fileName)
			data.append("file", coverImage)
			userData.coverPicture = fileName
			try {
				dispatch(uploadImage(data))
			} catch (error) {
				console.log(error)
			}
		}

		dispatch(updateUser(params.id, userData))
	}

	return (
		<form action="" className="infoForm" onSubmit={handleSubmit}>
			<h3>Your info</h3>
			<div>
				<input
					type="text"
					className="infoInput"
					name="firstname"
					placeholder="First Name"
					onChange={handleChange}
					value={formData.firstname}
				/>
				<input
					type="text"
					className="infoInput"
					name="lastname"
					placeholder="Last Name"
					onChange={handleChange}
					value={formData.lastname}
				/>
			</div>

			<div>
				<input
					type="text"
					className="infoInput"
					name="worksAt"
					placeholder="Works at"
					onChange={handleChange}
					value={formData.worksAt}
				/>
			</div>

			<div>
				<input
					type="text"
					className="infoInput"
					name="livesIn"
					placeholder="Lives In"
					onChange={handleChange}
					value={formData.livesIn}
				/>
				<input
					type="text"
					className="infoInput"
					name="country"
					placeholder="Country"
					onChange={handleChange}
					value={formData.country}
				/>
			</div>

			<div>
				<input
					type="text"
					className="infoInput"
					name="relationship"
					placeholder="RelationShip Status"
					onChange={handleChange}
					value={formData.relationship}
				/>
			</div>

			<div>
				Profile Image
				<input type="file" name="profileImage" onChange={onImageChange} />
				Cover Image
				<input type="file" name="coverImage" onChange={onImageChange} />
			</div>

			<button className="button infoButton" onClick={close}>
				Update
			</button>
		</form>
	)
}

export default ProfileModalForm
