import React, { useEffect, useRef, useState } from "react"
import userService from "../../services/user.service"
import messageService from "../../services/message.service"
import { format } from "timeago.js"
import InputEmoji from "react-input-emoji"
import "./ChatBox.css"

const ChatBox = ({ chat, currentUserId, setSendMessage, receiveMessage }) => {
	const [userData, setUserData] = useState(null)
	const [messages, setMessages] = useState([])
	const [newMessage, setNewMessage] = useState("")
	const scroll = useRef()

	useEffect(() => {
		if (receiveMessage !== null && receiveMessage?.chatId === chat?._id) {
			setMessages([...messages, receiveMessage])
		}
	}, [receiveMessage])

	// Fetching data for header
	useEffect(() => {
		const chatId = chat?.members?.find(id => id !== currentUserId)

		const getUserData = async () => {
			try {
				const data = await userService.get(chatId)
				setUserData(data)
			} catch (error) {
				console.log(error)
			}
		}

		if (chat !== null) getUserData()
	}, [chat, currentUserId])

	// Fetching data for messages
	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const data = await messageService.get(chat._id)
				setMessages(data)
			} catch (error) {
				console.log(error)
			}
		}

		if (chat !== null) fetchMessages()
	}, [chat])

	const handleChange = newMessage => {
		setNewMessage(newMessage)
	}

	const handleSend = async e => {
		e.preventDefault()
		const message = {
			senderId: currentUserId,
			text: newMessage,
			chatId: chat._id,
		}

		// Send message to database
		try {
			const data = await messageService.post(message)
			setMessages([...messages, data])
			setNewMessage("")
		} catch (error) {
			console.log(error)
		}
		// Send message to socket.io
		const receiverId = chat.members.find(id => id !== currentUserId)
		setSendMessage({ ...message, receiverId })
	}

	// Always scroll to last message
	useEffect(() => {
		scroll.current?.scrollIntoView({ behavior: "instant" })
	}, [messages])

	return (
		<>
			<div className="ChatBox-container">
				{chat ? (
					<>
						<div className="chat-header">
							<div className="follower">
								<div>
									<img
										src={
											userData?.profilePicture
												? process.env.REACT_APP_PUBLIC_FOLDER +
												  userData.profilePicture
												: process.env.REACT_APP_PUBLIC_FOLDER +
												  "defaultProfile.jpg"
										}
										className="followerImage"
										style={{ width: "50px", height: "50px" }}
										alt=""
									/>
									<div className="name" style={{ fontSize: "0.8rem" }}>
										<span>
											{userData?.firstname} {userData?.lastname}
										</span>
									</div>
								</div>
							</div>
							<hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
						</div>

						{/* Chatbox messages */}
						<div className="chat-body">
							{messages.map(message => (
								<>
									<div
										ref={scroll}
										className={
											message.senderId === currentUserId
												? "message own"
												: "message"
										}
									>
										<span>{message.text}</span>
										<span>{format(message.createdAt)}</span>
									</div>
								</>
							))}
						</div>

						{/* Chat sender */}
						<div className="chat-sender">
							<div>+</div>
							<InputEmoji value={newMessage} onChange={handleChange} />
							<div className="send-button button" onClick={handleSend}>
								Send
							</div>
						</div>
					</>
				) : (
					<span className="chatbox-empty-message">
						Tap on a Chat to start Conversation...
					</span>
				)}
			</div>
		</>
	)
}

export default ChatBox
