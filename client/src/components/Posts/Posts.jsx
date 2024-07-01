import React, { useEffect, useState } from "react"
import "./Posts.css"
import { useDispatch, useSelector } from "react-redux"
import Post from "../Post/Post"
import { getUser } from "../../store/authReducer"
import {
	getLoadingStatus,
	getPosts,
	timelinePosts,
} from "../../store/postReducer"
import { useParams } from "react-router-dom"

const Posts = () => {
	const dispatch = useDispatch()
	const params = useParams()
	const { user } = useSelector(getUser())
	const postsLoading = useSelector(getLoadingStatus())
	let posts = useSelector(getPosts())
	const isExistPost = posts.length > 0

	const [currentPostId, setCurrentPostId] = useState(null)

	// При первой загрузке страницы подгружаем все посты данного пользователя и те, на кого он подписан
	useEffect(() => {
		dispatch(timelinePosts(user._id))
	}, [])

	if (!isExistPost) return "no posts"
	// Проверка на то, находится ли пользователь на странице ред.профиля или нет
	if (params.id) {
		posts = posts.filter(post => post.userId === params.id)
	}

	return (
		<div className="Posts">
			{postsLoading
				? "Loading..."
				: posts.map((post, id) => {
						return (
							<Post
								data={post}
								id={id}
								key={id}
								currentPostId={currentPostId}
								setCurrentPostId={setCurrentPostId}
							/>
						)
				  })}
		</div>
	)
}

export default Posts
