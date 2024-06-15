import React from "react"
import "./RightSide.css"
import Home from "../../img/home.png"
import Noti from "../../img/noti.png"
import Comment from "../../img/comment.png"
import { UilSetting } from "@iconscout/react-unicons"
import TrendCard from "../TrendCard/TrendCard"
import { useDisclosure } from "@mantine/hooks"
import ShareModal from "../ShareModal/ShareModal"
import { Link } from "react-router-dom"

const RightSide = () => {
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<div className="RightSide">
			<div className="navIcons">
				<Link to={"../home"}>
					<img src={Home} alt="" />
				</Link>

				<UilSetting />
				<img src={Noti} alt="" />
				<Link to="/chat">
					<img src={Comment} alt="" />
				</Link>
			</div>

			<TrendCard />

			<button className="button r-button" onClick={open}>
				Share
			</button>
			<ShareModal opened={opened} close={close} />
		</div>
	)
}

export default RightSide
