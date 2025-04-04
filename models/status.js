
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatusSchema = new Schema({

        userId: {
            type: String,
            required: true,
        },
        userphotos:{
            type: String,
            required: false,
        },
        userphonenumber: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        stausMessage: {
            type: String,
            required: true,
        },
        statusImage: {
            type: String,
            required: false,
        },
        statusType: {
            type: String,
            required: true,
        },
        timestamp: { type: Date, default: Date.now }
});

mongoose.model("status", StatusSchema);