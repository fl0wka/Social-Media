import React from "react"
import "./Navigation.css"
import Home from "../../img/home.png"
import HomeActive from "../../img/home_active.png"
import Comment from "../../img/comment.png"
import CommentActive from "../../img/comment_active.png"
import NavButton from "../NavButton/NavButton"

const Navigation = () => {
	const navList = [
		{
			path: "/home",
			img: Home,
			activeImg: HomeActive,
		},
		{ path: "/chat", img: Comment, activeImg: CommentActive },
	]

	return (
		<div className="navIcons">
			{navList.map(item => {
				return (
					<NavButton
						path={item.path}
						img={item.img}
						activeImg={item.activeImg}
						key={item.path}
					/>
				)
			})}
		</div>
	)
}

export default Navigation
