import React from "react"
import { Modal } from "@mantine/core"
import PostShare from "../PostShare/PostShare"

const ShareModal = ({ opened, close }) => {
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
				<PostShare />
			</Modal>
		</>
	)
}

export default ShareModal
