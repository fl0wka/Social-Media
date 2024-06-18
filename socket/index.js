const io = require("socket.io")(8800, {
	cors: {
		cors: "http://localhost:3000",
	},
})

let activeUsers = []

io.on("connection", socket => {
	// Add new User
	socket.on("new-user-add", newUserId => {
		// if user is not added previously
		if (!activeUsers.some(user => user.userId === newUserId)) {
			activeUsers.push({
				userId: newUserId,
				socketId: socket.id,
			})
		}
		console.log("Connected Users,", "activeUsers: ", activeUsers)

		io.emit("get-users", activeUsers)
	})

	socket.on("disconnect", () => {
		activeUsers = activeUsers.filter(user => user.socketId !== socket.id)
		console.log("User Disconnected,", "activeUsers: ", activeUsers)

		io.emit("get-users", activeUsers)
	})
})
