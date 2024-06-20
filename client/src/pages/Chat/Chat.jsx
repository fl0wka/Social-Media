import React, { useEffect, useRef, useState } from "react"
import "./Chat.css"
import LogoSearch from "../../components/LogoSearch/LogoSearch"
import { useSelector } from "react-redux"
import { getUser } from "../../store/authReducer"
import chatService from "../../services/chat.service"
import Conversation from "../../components/Conversation/Conversation"
import Navigation from "../../components/Navigation/Navigation"
import ChatBox from "../../components/ChatBox/ChatBox"
import { io } from "socket.io-client"

const Chat = () => {
	const { user } = useSelector(getUser())
	const [chats, setChats] = useState([])
	const [currentChat, setCurrentChat] = useState(null)
	const [onlineUsers, setOnlineUsers] = useState([])
	const [sendMessage, setSendMessage] = useState(null)
	const [receiveMessage, setReceiveMessage] = useState(null)
	const socket = useRef()

	// Sending message to socket server
	useEffect(() => {
		if (sendMessage !== null) {
			socket.current.emit("send-message", sendMessage)
		}
	}, [sendMessage])

	useEffect(() => {
		socket.current = io("http://localhost:8800")
		socket.current.emit("new-user-add", user._id)
		socket.current.on("get-users", users => {
			setOnlineUsers(users)
		})
	}, [user])

	// Receive message from socket server
	useEffect(() => {
		socket.current.on("receive-message", data => {
			setReceiveMessage(data)
		})
	}, [])

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

	const checkOnlineStatus = chat => {
		const chatMember = chat.members.find(member => member !== user._id)
		const online = onlineUsers.find(user => user.userId === chatMember)
		return online ? true : false
	}

	return (
		<div className="Chat">
			{/* Left side */}
			<div className="Left-side-chat">
				<LogoSearch />
				<div className="Chat-container">
					<h2>Chats</h2>
					<div className="Chat-list">
						{chats.map(chat => (
							<div onClick={() => setCurrentChat(chat)} key={chat._id}>
								<Conversation
									data={chat}
									currentUserId={user._id}
									online={checkOnlineStatus(chat)}
								/>
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
				<ChatBox
					chat={currentChat}
					currentUserId={user._id}
					setSendMessage={setSendMessage}
					receiveMessage={receiveMessage}
				/>
			</div>
		</div>
	)
}

export default Chat
