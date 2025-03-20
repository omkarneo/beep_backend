const router = require('express').Router()
const controller = require('../../controller/roomcontroller/controller')
const veriytoken = require('../../middleware/jwt')

router.get('/', veriytoken, controller.getroomController)
router.post('/create', veriytoken, controller.createRoomController)

module.exports = router