const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

// Ensure upload directories exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Configure Multer to store files in memory (for processing before saving)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Image Processing Middleware
const processAndSaveImage = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Determine the upload category based on the route
  let category = req.route.path.split("/").pop();
  if (category === "profilephoto") category = "profile";
  else if (category === "status") category = "status";
  else if (category === "chats") category = "chats";
  else category = "others";

  const uploadPath = `public/uploads/${category}`;
  ensureDir(uploadPath); // Ensure directory exists

  // Set the file name and path
  const fileName = `${req.file.fieldname}-${Date.now()}.jpg`;
  const filePath = path.join(uploadPath, fileName);

  try {
    // Process image with Sharp
    await sharp(req.file.buffer)
      .resize(800) // Resize width to 800px
      .jpeg({ quality: 30 }) // Reduce quality to 60%
      .toFile(filePath);

    req.file.path = filePath; // Attach path to request object

    next(); // Proceed to controller
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error processing image.");
  }
};

module.exports = { upload, processAndSaveImage };
