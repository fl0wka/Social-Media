import React from "react"
import { Link, useLocation } from "react-router-dom"

const NavButton = ({ path, img, activeImg }) => {
	const { pathname } = useLocation()

	return (
		<Link to={path}>
			<img src={pathname === path ? activeImg : img} alt="" />
		</Link>
	)
}

export default NavButton
