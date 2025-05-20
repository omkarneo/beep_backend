const socketIo = require("socket.io");
const { usermodel, roommodel } = require("./mongoose")
const { sendPushNotification } = require("./firebase");


const socketServer = (server) => {
    const io = socketIo(server, { cors: { origin: "*" } });
    // 🔥 WebSocket Handling
    io.on("connection", (socket) => {
        console.log("✅ New client connected:", socket.id);
        socket.on("connect_room", async ({ userid, roomid }) => {
            console.log(`Connect Data ${userid} ${roomid}`);
            if(userid!=undefined){
                await usermodel.findByIdAndUpdate({ _id: userid }, { activeRoom: roomid });
            }
        
        })
        socket.on("disconnect_room", async ({ userid }) => {
          console.log(`disConnect Data ${userid} `);
          if (userid != undefined) {
            await usermodel.findByIdAndUpdate(
              { _id: userid },
              { activeRoom: "" }
            );
          }
        });
        // Send Message
        socket.on("sendMessage", async ({ senderId, roomId, message, messagetype, image }) => {
            var userdata = await usermodel.findOne({ _id: senderId });
            const newMessage = { senderId, senderName: userdata.firstName, message, senderNumber: userdata.phonenumber, timestamp: new Date(), messagetype, image };
            await roommodel.findByIdAndUpdate({ _id: roomId }, {
                $push: {
                    messages: newMessage
                }
            })
            var responsemessage = await roommodel.findOne({ _id: roomId })
            responsemessage.Users.map(async (value)=>{

                
                if (value.userId != senderId) {
                     var reciverdata = await usermodel.findOne({ _id: value.userId });
                    if(reciverdata.activeRoom!=roomId){
                          sendPushNotification(
                            newMessage.senderName,
                            message,
                            value.userId,
                            "",
                            roomId
                          );
                    }
                
                }
            })
            
            
            io.emit(roomId, responsemessage.messages);
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
            if(data!=null){
            io.emit("status_receviers", { number: data.phonenumber, Status: "Online" });
            }
           
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