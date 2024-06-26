import React, { useEffect, useRef, useState } from "react"
import "./Post.css"
import Comment from "../../img/comment.png"
import Share from "../../img/share.png"
import Heart from "../../img/like.png"
import NotLike from "../../img/notlike.png"
import { useSelector } from "react-redux"
import { getUser } from "../../store/authReducer"
import postService from "../../services/post.service"

const Post = ({ data }) => {
	const { user } = useSelector(getUser())
	const [isLiked, setIsLiked] = useState(data.likes.includes(user._id))
	const [likes, setLikes] = useState(data.likes.length)
	const [isOpen, setIsOpen] = useState(false)
	const [comment, setComment] = useState("")
	const refInput = useRef()

	const handleLike = () => {
		setIsLiked(prev => !prev)
		postService.likePost(data._id, user._id)
		isLiked ? setLikes(prev => prev - 1) : setLikes(prev => prev + 1)
	}

	const handleComment = () => {
		setIsOpen(prev => !prev)
		setComment("")
	}

	const handleChange = e => {
		setComment(e.target.value)
	}

	const handleSendComment = e => {
		e.preventDefault()
		console.log(comment)
		setComment("")
	}

	useEffect(() => {
		if (isOpen) {
			refInput.current.focus()
		}
	}, [isOpen])

	return (
		<div className="Post">
			<img
				src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
				alt=""
			/>

			<div className="postReact">
				<img
					src={isLiked ? Heart : NotLike}
					alt=""
					style={{ cursor: "pointer" }}
					onClick={handleLike}
				/>
				<img
					onClick={handleComment}
					style={{ width: "27px", height: "27px", cursor: "pointer" }}
					src={Comment}
					alt=""
				/>
				<img style={{ cursor: "pointer" }} src={Share} alt="" />
			</div>

			<span style={{ color: "var(--gray)", fontSize: "12px" }}>
				{likes} likes
			</span>

			{isOpen && (
				<form style={{ display: "flex", gap: "1rem" }} type="submit">
					<input
						ref={refInput}
						type="text"
						placeholder="Your comment"
						onChange={handleChange}
						value={comment}
					/>
					<button onClick={handleSendComment}>Send</button>
				</form>
			)}

			<div className="details">
				<span>
					<b>{data.name}</b>
				</span>
				<span> {data.desc}</span>
			</div>
		</div>
	)
}

export default Post
