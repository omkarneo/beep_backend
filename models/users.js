
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  phonenumber: {
    type: String,
    required: true,
  },

  photos: {
    type: String,
    required: false,
  },
  auth: {
    otp: {
      type: String,
      required: false,
    },
    createDate: {
      type: Date,
      required: false,
    },
    expiryDate: {
      type: Date,
      required: false,
    },
  },
  rooms: [{
    roomId: {
      type: String, required: true,
    },
    recevierid: {
      type: String, required: true,
    },
    receviernumber: {
      type: String, required: true,
    },
    recevierName: {
      type: String, required: true,
    },
    lastchat: {
      type: String, required: false,
    },
    recevierphoto: {
      type: String, required: true,
    },
    lastchatTime: {
      type: String, required: false,
    }

  }],
});

mongoose.model("user", UserSchema);