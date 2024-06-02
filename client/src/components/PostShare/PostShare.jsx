import React, { useRef, useState } from "react"
import "./PostShare.css"
import {
	UilScenery,
	UilPlayCircle,
	UilSchedule,
	UilLocationPoint,
	UilTimes,
} from "@iconscout/react-unicons"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "../../store/authReducer"
import { uploadImage } from "../../store/uploadAction"
import { getUploadStatus, uploadPost } from "../../store/postReducer"

const PostShare = () => {
	const loading = useSelector(getUploadStatus())
	const dispatch = useDispatch()
	const [image, setImage] = useState(null)
	const imageRef = useRef()
	const desc = useRef()
	const { user } = useSelector(getUser())
	const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

	const reset = () => {
		setImage(null)
		desc.current.value = ""
	}

	const onImageChange = event => {
		if (event.target.files && event.target.files[0]) {
			let img = event.target.files[0]
			setImage(img)
		}
	}

	const handleSubmit = e => {
		e.preventDefault()

		const newPost = {
			userId: user._id,
			desc: desc.current.value,
		}

		if (image) {
			const data = new FormData()
			// Конкатенация "даты + название" дает нам уникальное имя изображения
			const fileName = Date.now() + image.name
			data.append("name", fileName)
			data.append("file", image)
			// Отправлять в поле image на сервер будем название картинки, а не ссылку
			newPost.image = fileName
			// Далее отправляем данные на сервер
			try {
				dispatch(uploadImage(data))
			} catch (error) {
				console.log(error)
			}
		}
		dispatch(uploadPost(newPost))
		reset()
	}

	return (
		<div className="PostShare">
			<img
				src={
					user.profilePicture
						? serverPublic + user.profilePicture
						: serverPublic + "defaultProfile.jpg"
				}
				alt=""
			/>
			<div>
				<input
					type="text"
					placeholder="What's happening"
					ref={desc}
					// Указываем, что это обязательное поле. Если его не заполнить, то вернется пустая строка ""
					required
				/>
				<div className="postOptions">
					<div
						className="option"
						style={{ color: "var(--photo)" }}
						onClick={() => imageRef.current.click()}
					>
						<UilScenery />
						Photo
					</div>
					<div className="option" style={{ color: "var(--video)" }}>
						<UilPlayCircle />
						Video
					</div>
					<div className="option" style={{ color: "var(--location)" }}>
						<UilLocationPoint />
						Location
					</div>
					<div className="option" style={{ color: "var(--shedule)" }}>
						<UilSchedule />
						Shedule
					</div>
					<button
						className="button ps-button"
						onClick={handleSubmit}
						disabled={loading}
					>
						{loading ? "Uploading..." : "Share"}
					</button>
					<div style={{ display: "none" }}>
						<input
							type="file"
							name="myImage"
							ref={imageRef}
							onChange={onImageChange}
						/>
					</div>
				</div>
				{image && (
					<div className="previewImage">
						<UilTimes onClick={() => setImage(null)} />
						<img src={URL.createObjectURL(image)} alt="" />
					</div>
				)}
			</div>
		</div>
	)
}

export default PostShare
