import React from "react"

const ProfileModalForm = () => {
	return (
		<form action="" className="infoForm">
			<h3>Your info</h3>
			<div>
				<input
					type="text"
					className="infoInput"
					name="FirstName"
					placeholder="First Name"
				/>
				<input
					type="text"
					className="infoInput"
					name="LastName"
					placeholder="Last Name"
				/>
			</div>

			<div>
				<input
					type="text"
					className="infoInput"
					name="WorksAT"
					placeholder="Works at"
				/>
			</div>

			<div>
				<input
					type="text"
					className="infoInput"
					name="LivesIN"
					placeholder="Lives In"
				/>
				<input
					type="text"
					className="infoInput"
					name="Country"
					placeholder="Country"
				/>
			</div>

			<div>
				<input
					type="text"
					className="infoInput"
					placeholder="RelationShip Status"
				/>
			</div>

			<div>
				Profile Image
				<input type="file" name="profileImg" />
				Cover Image
				<input type="file" name="coverImg" />
			</div>

			<button className="button infoButton">Update</button>
		</form>
	)
}

export default ProfileModalForm
