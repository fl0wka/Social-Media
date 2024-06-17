import React from "react"
import "./RightSide.css"
import TrendCard from "../TrendCard/TrendCard"
import { useDisclosure } from "@mantine/hooks"
import ShareModal from "../ShareModal/ShareModal"
import Navigation from "../Navigation/Navigation"

const RightSide = () => {
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<div className="RightSide">
			<Navigation />

			<TrendCard />

			<button className="button r-button" onClick={open}>
				Share
			</button>
			<ShareModal opened={opened} close={close} />
		</div>
	)
}

export default RightSide
