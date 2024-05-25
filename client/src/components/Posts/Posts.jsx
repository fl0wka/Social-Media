import React from "react"
import { PostsData } from "../../Data/PostsData"
import "./Posts.css"
import Post from "../Post/Post"

const Posts = () => {
	return (
		<div className="Posts">
			{PostsData.map((post, id) => {
				return <Post data={post} id={id} key={id} />
			})}
		</div>
	)
}

export default Posts
