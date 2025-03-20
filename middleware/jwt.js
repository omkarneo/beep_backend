const jwt = require("../service/jwt");
const mongo = require("../service/mongoose")

// Mongo otp
require("../models/users");
const usermodel = mongo.mongodb.model("user");

const veriytoken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      if (bearer[0] == "Bearer") {
        const bearerToken = bearer[1];
        const data = await jwt.jwtverify(bearerToken);
        await usermodel.findById({ _id: data }).then((value) => {
          if (value != null) {
            res.locals.phonenumber = value.phonenumber;
            next();
          } else {
            res.statusCode = 401;
            res.send({
              status: "unsuccessfully",
              message: `${value.typeName} is Not Authorized for this Api`,
            });
          }
        });
      } else {
        res.statusCode = 401;
        res.send({
          status: "unsuccessfully",
          message: `Keyword is Not Authorized`,
        });
      }
    } else {
      res.statusCode = 401;
      res.send({
        status: "unsuccessfully",
        message: `Please add header`,
      });
    }
  } catch (err) {
    res.statusCode = 401;
    res.send(err);
  }
};


module.exports = veriytoken;
