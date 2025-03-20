const mongodb = require("mongoose")


const mongoconnection = () => {
  mongodb.connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASS}@cluster0.jhv9f.mongodb.net/`
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




module.exports = { mongoconnection, mongodb, roommodel, usermodel };


