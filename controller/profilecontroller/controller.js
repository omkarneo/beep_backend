const { usermodel, roommodel } = require("../../service/mongoose")

const getProfileController = async (req, res) => {
    const response = await usermodel
        .findOne(
            { phonenumber: res.locals.phonenumber },
        )
        .catch((err) => {
            console.log(err);
        });
    if (response != null) {
        res.statusCode = 200;
        res.send({
            status: "successfully",
            // message: "Profile Updated",
            data: response

        });
    } else {
        res.statusCode = 200;
        res.send({
            status: "unsuccessfully",
            message: "Something went Wrong",
        });
    }
}


const updateprofileController = async (req, res) => {

    var data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phonenumber: res.locals.phonenumber,
        photos: req.body.photos,
        status: "Active"

    };

    const response = await usermodel
        .findOneAndUpdate(
            { phonenumber: res.locals.phonenumber },
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phonenumber: res.locals.phonenumber,
                    photos: req.body.photos,
                },
            }
        )
        .catch((err) => {
            console.log(err);
        });


    if (response != null) {
        res.statusCode = 200;
        res.send({
            status: "successfully",
            message: "Profile Updated",
        });
    } else {
        res.statusCode = 200;
        res.send({
            status: "unsuccessfully",
            message: "Something went Wrong",
        });
    }

}

module.exports = { getProfileController, updateprofileController }