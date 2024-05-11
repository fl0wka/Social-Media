import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		profilePicture: String,
		coverPicture: String,
		about: String,
		livesIn: String,
		worksAt: String,
		relationship: String,
		followers: [],
		following: [],
	},
	// Добавляет временные метки
	{ timestamps: true }
)

const UserModel = mongoose.model('Users', userSchema)
export default UserModel
