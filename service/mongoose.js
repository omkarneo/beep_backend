const mongodb = require("mongoose")


const mongoconnection = () => {
  mongodb.connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASS}@cluster0.jhv9f.mongodb.net/beep`
  ).then(() => {
    console.log("Mongodb Connected")
  });
};

// Mongo User Model
require('../models/users')
const usermodel = mongodb.model("user");


// Mongo Room Model
require('../models/room')
const roommodel = mongodb.model("room");


// Mongo Status Model
require('../models/status');
const statusmodel=mongodb.model("status")




module.exports = { mongoconnection, mongodb, roommodel, usermodel,statusmodel };


