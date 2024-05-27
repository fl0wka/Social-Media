import React, { useEffect } from "react"
import "./Posts.css"
import { useDispatch, useSelector } from "react-redux"
import Post from "../Post/Post"
import { getUser } from "../../store/authReducer"
import {
	getLoadingStatus,
	getPosts,
	timelinePosts,
} from "../../store/postReducer"

const Posts = () => {
	const dispatch = useDispatch()
	const { user } = useSelector(getUser())
	const postsLoading = useSelector(getLoadingStatus())
	const posts = useSelector(getPosts())

	// При первой загрузке страницы подгружаем все посты данного пользователя и те, на кого он подписан
	useEffect(() => {
		dispatch(timelinePosts(user._id))
	}, [])

	return (
		<div className="Posts">
			{postsLoading
				? "Loading..."
				: posts.map((post, id) => {
						return <Post data={post} id={id} key={id} />
				  })}
		</div>
	)
}

export default Posts
