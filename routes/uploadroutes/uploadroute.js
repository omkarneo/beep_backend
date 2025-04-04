const router = require('express').Router()
const controller = require('../../controller/uploadcontroller/controller')
const veriytoken = require('../../middleware/jwt')
const { upload, processAndSaveImage } = require("../../service/multer");

router.post(
  "/profilephoto",
  veriytoken,
  upload.single("file"),
  processAndSaveImage,
  controller.profileuploadcontroller
);
router.post(
  "/status",
  veriytoken,
  upload.single("file"),
  processAndSaveImage,
  controller.statusuploadcontroller
);
router.post('/chats', veriytoken, upload.single('file'),processAndSaveImage, controller.chatsuploadcontroller)

module.exports = router