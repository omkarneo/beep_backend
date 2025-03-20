
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    Users: [
        {
            userName: {
                type: String,
                required: true,
            },
            phoneNumber: {
                type: String,
                required: true,
            },
            userId: {
                type: String,
                required: true,
            },
        }
    ],
    messages: [{
        senderId: String,
        senderNumber: String,
        senderName: String,
        message: String,
        image: String,
        messagetype: String,
        timestamp: { type: Date, default: Date.now }
    }]
});

mongoose.model("room", RoomSchema);