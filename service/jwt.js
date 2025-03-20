var jwt = require("jsonwebtoken");

const jwtsigin = (payload) => {
  try {
    return jwt.sign(payload.toJSON(), process.env.SECRETKEY, {
      //   expiresIn: "10h",
    });
  } catch (err) {
    throw err;
  }
};
const jwtverify = async (token) => {
  try {
    var data = jwt.verify(token, process.env.SECRETKEY);
    return data;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw "Token Expired";
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw error.message;
    }
  }
};
// var token = jwtsigin({ yo: "yo" })
// console.log(token);
// jwtverify(token).then(res => console.log(res, "dfsd")).catch(err => {
//     console.log(typeof (err))
// })

module.exports = { jwtverify, jwtsigin };
