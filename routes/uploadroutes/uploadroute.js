const router = require('express').Router()
const controller = require('../../controller/uploadcontroller/controller')
const veriytoken = require('../../middleware/jwt')
const { upload } = require("../../service/multer")

router.post('/profilephoto', veriytoken, upload.single('file'), controller.profileuploadcontroller)
router.post('/status', veriytoken, upload.single('file'), controller.statusuploadcontroller)
router.post('/chats', veriytoken, upload.single('file'), controller.chatsuploadcontroller)

module.exports = router