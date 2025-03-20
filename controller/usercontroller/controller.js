const { usermodel, roommodel } = require("../../service/mongoose")

const getUserController = async (req, res) => {
    try {
        var response = await usermodel.find({ phonenumber: { $ne: res.locals.phonenumber } },).select("firstName lastName phonenumber photos id");

        res.statusCode = 200;
        res.send({
            status: "successfully",
            data: response
        });
    }
    catch (err) {
        console.log(err);
        res.statusCode = 400;
        res.send({
            status: "unsuccessfully",
            data: err
        });
    }
}
const getStatusController = async (req, res) => {
    try {
        const data = await usermodel.findOne({ _id: req.body.recevierid })
        if (data != null) {
            res.statusCode = 200;
            res.send({
                status: "successfully",
                receiverStatus: data.status
            });
        }
        else {
            res.statusCode = 400;
            res.send({
                status: "unsuccessfully",
                data: "no Data Found"
            });
        }
    } catch (err) {
        res.statusCode = 400;
        res.send({
            status: "unsuccessfully",
            data: err
        });
    }
}
const getChatController = async (req, res) => {
    try {
        const data = await roommodel.findOne({ _id: req.body.roomid });
        if (data != null) {
            res.statusCode = 200;
            res.send({
                status: "successfully",
                data: data.messages,
                receiverStatus: ""
            });
        }
        else {
            res.statusCode = 400;
            res.send({
                status: "unsuccessfully",
                data: "no Data Found"
            });
        }
    } catch (err) {
        res.statusCode = 400;
        res.send({
            status: "unsuccessfully",
            data: err
        });
    }
}


module.exports = { getUserController, getStatusController, getChatController }