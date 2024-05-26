import express from "express"
import multer from "multer"

const router = express.Router()

// Сохранение файлов на локальный диск
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// Указан локальный путь для сохранения
		cb(null, "public/images")
	},
	filename: function (req, file, cb) {
		cb(null, req.body.name)
	},
})

const upload = multer({ storage: storage })

router.post(
	"/",
	upload.single("file", (req, res) => {
		try {
			return res.status(200).json("File Uploaded Successfully")
		} catch (error) {
			console.log(error)
		}
	})
)

export default router
