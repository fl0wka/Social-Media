import React, { useEffect, useState } from "react"
import "./Chat.css"
import LogoSearch from "../../components/LogoSearch/LogoSearch"
import { useSelector } from "react-redux"
import { getUser } from "../../store/authReducer"
import chatService from "../../services/chat.service"
import Conversation from "../../components/Conversation/Conversation"
import Navigation from "../../components/Navigation/Navigation"
import ChatBox from "../../components/ChatBox/ChatBox"

const Chat = () => {
	const { user } = useSelector(getUser())
	const [chats, setChats] = useState([])
	const [currentChat, setCurrentChat] = useState(null)

	useEffect(() => {
		const getChats = async () => {
			try {
				const data = await chatService.getAll(user._id)
				setChats(data)
			} catch (error) {
				console.log(error)
			}
		}

		getChats()
	}, [user])

	return (
		<div className="Chat">
			{/* Left side */}
			<div className="Left-side-chat">
				<LogoSearch />
				<div className="Chat-container">
					<h2>Chats</h2>
					<div className="Chat-list">
						{chats.map(chat => (
							<div onClick={() => setCurrentChat(chat)}>
								<Conversation data={chat} currentUserId={user._id} />
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Right side */}
			<div className="Right-side-chat">
				<div style={{ width: "20rem", alignSelf: "flex-end" }}>
					<Navigation />
				</div>

				{/* Chat body */}
				<ChatBox chat={currentChat} currentUserId={user._id} />
			</div>
		</div>
	)
}

export default Chat
