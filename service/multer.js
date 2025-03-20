const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var catergory = req.route.path.split("/").pop();
        if (catergory == "profilephoto") {
            catergory = "profile"
        } else if (catergory == "status") {
            catergory = "status"
        } else if (catergory == "chats") {
            catergory = "chats"
        }
        else {
            catergory = "others"
        }
        console.log(catergory);
        const uploadPath = `public/uploads/${catergory}`;


        ensureDir(uploadPath); // Create folder if it doesn't exist
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }


});

const upload = multer({ storage: storage });


module.exports = { upload };