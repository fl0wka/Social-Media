import mongoose from "mongoose"

const postSchema = mongoose.Schema(
	{
		userId: { type: String, require: true },
		desc: String,
		likes: [],
		image: String,
	},
	{ timestamps: true }
)

const PostModel = mongoose.model("post", postSchema)
export default PostModel
