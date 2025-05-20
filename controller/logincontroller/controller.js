
const { usermodel, roommodel } = require("../../service/mongoose")
const { jwtsigin } = require("../../service/jwt")

const entrypointController = async (req, res) => {

    console.log(req.body);

    var bodyData = req.body;
    let exist = false;

    let dbuser = await usermodel.find();
    await dbuser.map((value) => {
        if (value.phonenumber == bodyData.number) {
            exist = true;
        }
    });
    if (exist) {
        usermodel.findOneAndUpdate({ phonenumber: bodyData.number }, {
            $set: {
                auth: {
                    otp: "1234",
                    createDate: new Date(),
                    expiryDate: new Date(Date.now() + 5 * 60000)
                }
                ,
            }
        }).catch((err) => {
            console.log(err)
        })

        // await sendMail(value.email, otp)  // For Send Mail
        res.statusCode = 200
        res.send({
            status: "successfully",
            message: `OTP send to the mail`,
            // data: ,
        });

    }
    else {
        var userdata = {
            phonenumber: bodyData.number,
            auth: {
                otp: "1234",
                createDate: new Date(),
                expiryDate: new Date(Date.now() + 5 * 60000),
            },
        };

        let reponse = await usermodel(userdata).save().catch((err) => {
            console.log(err);
        });
        res.statusCode = 200;
        res.send({
            status: "successfully",
            message: `User Created and OTP send`,
            // data: reponse.phonenumber,
        });

    }
}

const otpController = async (req, res) => {
    try {
        if (req.body.number == undefined) {
            throw "Proper Body is Not Provided";
        } else if (req.body.otp == undefined) {
            throw "Proper Body is Not Provided";
        }

        var response = await usermodel.findOne({ phonenumber: req.body.number });

        if (response == null) {
            res.statusCode = 403;
            res.send({
                status: "unsuccessfully",
                message: "no Users Found",
            });
        }

        if (response.auth.expiryDate > Date.now()) {
            if (response.auth.otp == req.body.otp) {
                let payload = await usermodel.findOne({ phonenumber: req.body.number });
                let token = jwtsigin(payload._id);

                await usermodel.findOneAndUpdate({ phonenumber: req.body.number }, {
                    status: "Online",
                    fcmToken:req.body.token
                });
                const io = req.app.get('socketio');
                io.emit("status_receviers", { "number": req.body.number, "Status": "Online" })
                res.statusCode = 200;
                res.send({
                    status: "successfully",
                    newAccount: payload.firstName == null,
                    data: {
                        name: `${payload.firstName}`,

                        id: payload._id,
                        token: token,
                    },
                });
            } else {
                res.statusCode = 403;
                res.send({
                    status: "unsuccessfully",
                    message: "Wrong Otp",
                });
            }
        } else {
            res.statusCode = 408;
            res.send({
                status: "unsuccessfully",
                message: "Otp Has Been Expired",
            });
        }



    } catch (error) {
        res.statusCode = 422;
        res.send({
            status: "unsuccessfully",
            message: error,
        });
        console.log(error);

    }
}



module.exports = { entrypointController, otpController }