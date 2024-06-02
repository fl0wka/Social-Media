import React from "react"
import { Modal } from "@mantine/core"
import ProfileModalForm from "../ProfileModalForm/ProfileModalForm"
import { useSelector } from "react-redux"
import { getUser } from "../../store/authReducer"

const ProfileModal = ({ opened, close }) => {
	const { user } = useSelector(getUser())

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				overlayProps={{
					backgroundOpacity: 0.55,
					blur: 3,
				}}
				size="55%"
			>
				<ProfileModalForm data={user} close={close} />
			</Modal>
		</>
	)
}

export default ProfileModal
