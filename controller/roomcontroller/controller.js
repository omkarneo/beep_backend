const { usermodel, roommodel } = require("../../service/mongoose")

const getroomController = async (req, res) => {
    try {

        const data = await usermodel.findOne({ "phonenumber": res.locals.phonenumber });
        console.log(data.rooms);
        res.statusCode = 200;
        res.send({
            status: "successfully",
            data: data.rooms
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

const createRoomController = async (req, res) => {
    var isExists = false;
    var Existedroomid = "";
    const userData = await usermodel
        .findOne(
            { phonenumber: res.locals.phonenumber },
        )
        .catch((err) => {
            console.log(err);
        });
    const receiverData = await usermodel.findOne({ _id: req.body.receiverUserId });

    if (userData != null && receiverData != null) {
        if (userData.rooms.length != 0) {
            userData.rooms.map((value) => {
                console.log(value.recevierid);
                console.log(req.body.receiverUserId);
                console.log(value.recevierid == receiverData._id);
                if (value.recevierid == receiverData._id) {
                    isExists = true;
                    Existedroomid = value.roomId;
                }
            })
        }
        if (isExists) {
            res.statusCode = 200;
            res.send({
                status: "successfully",
                message: `Room Already Exists`,
                roomId: Existedroomid
                // data: reponse.phonenumber,
            });
        } else {
            var roomdata = {
                Users: [
                    {
                        userName: `${userData.firstName} ${userData.lastName}`,
                        phoneNumber: userData.phonenumber,
                        userId: userData._id
                    },
                    {
                        userName: `${receiverData.firstName} ${receiverData.lastName}`,
                        phoneNumber: receiverData.phonenumber,
                        userId: receiverData._id
                    },
                ],
                messages: []

            }
            let response = await roommodel(roomdata).save().catch((err) => {
                console.log(err);
            });
            console.log(response._id.toString())
            await usermodel.findByIdAndUpdate({ _id: userData._id }, {
                $push: {
                    rooms: {
                        roomId: response._id.toString(),
                        recevierid: receiverData._id,
                        receviernumber: receiverData.phonenumber,
                        recevierName: `${receiverData.firstName} ${receiverData.lastName}`,
                        lastchat: `${receiverData.firstName} Joined Room`,
                        recevierphoto: receiverData.photos,
                        lastchatTime: Date.now()
                    }
                }
            })
            await usermodel.findByIdAndUpdate({ _id: receiverData._id }, {
                $push: {
                    rooms: {
                        roomId: response._id.toString(),
                        recevierid: userData._id,
                        receviernumber: userData.phonenumber,
                        recevierName: `${userData.firstName} ${userData.lastName}`,
                        lastchat: `${userData.firstName} Joined Room`,
                        recevierphoto: userData.photos,
                        lastchatTime: Date.now()

                    }
                }
            })


            // let userresponse = await usermodel.findByIdAndUpdate({})
            res.statusCode = 200;
            res.send({
                status: "successfully",
                message: `Room Created`,
                roomId: response._id.toString()
                // data: reponse.phonenumber,
            });

        }

    }
    else {
        res.statusCode = 400;
        res.send({
            status: "fail",
            message: `User not Found`,
            // data: reponse.phonenumber,
        });
    }
}

module.exports = { getroomController, createRoomController }