const socketIo = require("socket.io");
const { usermodel, roommodel } = require("./mongoose")


const socketServer = (server) => {
    const io = socketIo(server, { cors: { origin: "*" } });
    // 🔥 WebSocket Handling
    io.on("connection", (socket) => {
        console.log("✅ New client connected:", socket.id);
        socket.on("status_channel", async ({ userid, status }) => {
        })
        // Send Message
        socket.on("sendMessage", async ({ senderId, roomId, message, messagetype, image }) => {
            var userdata = await usermodel.find({ _id: senderId });
            const newMessage = { senderId, senderName: userdata.firstName, message, senderNumber: userdata.phonenumber, timestamp: new Date(), messagetype, image };
            await roommodel.findByIdAndUpdate({ _id: roomId }, {
                $push: {
                    messages: newMessage
                }
            })
            var message = await roommodel.findOne({ _id: roomId })

            io.emit(roomId, message.messages);
        });
        socket.on("logout_with_id", async (id) => {
            var data=await usermodel.findOneAndUpdate({ _id: id }, {
                status: "offline"
            });
            
            console.log(`logout------ ${data.phonenumber}`);

            io.emit("status_receviers", {
              number: data.phonenumber,
              Status: "Offline",
            });

        })
        socket.on("logout", async (phoneNumber) => {
            await usermodel.findOneAndUpdate({ phonenumber: phoneNumber }, {
                status: "offline"
            });
            console.log(`logout ${phoneNumber}`);

            io.emit("status_receviers", { "number": phoneNumber, "Status": "Offline" })

        })
        socket.on("login", async (phoneNumber) => {
            await usermodel.findOneAndUpdate({ phonenumber: phoneNumber }, {
                status: "Online"
            });
            console.log(`login ${phoneNumber}`);
            io.emit("status_receviers", { "number": phoneNumber, "Status": "Online" })
        })
        socket.on("login_with_Id", async (id) => {
            var data = await usermodel.findOneAndUpdate({ _id: id }, {
                status: "Online"
            });
            io.emit("status_receviers", { "number": data.phonenumber, "Status": "Online" })
        })

        // User disconnects
        socket.on("disconnect", async () => {
            console.log("❌ User disconnected:", socket.id);
        });
    });
    return io;


}

module.exports = {
    socketServer,
};