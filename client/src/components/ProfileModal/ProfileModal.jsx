import React from "react"
import { Modal } from "@mantine/core"
import ProfileModalForm from "../ProfileModalForm/ProfileModalForm"

const ProfileModal = ({ opened, close }) => {
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
				<ProfileModalForm />
			</Modal>
		</>
	)
}

export default ProfileModal
