import React from "react"
import "./Chat.css"
import LogoSearch from "../../components/LogoSearch/LogoSearch"

const Chat = () => {
	return (
		<div className="Chat">
			{/* Left side */}
			<div className="Left-side-chat">
				<LogoSearch />
				<div className="Chat-container">
					<h2>Chats</h2>
					<div className="Chat-list">Conversations</div>
				</div>
			</div>

			{/* Right side */}
			<div className="Right-side-chat">Right Side</div>
		</div>
	)
}

export default Chat
