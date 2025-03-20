const router = require('express').Router()
const veriytoken = require('../../middleware/jwt')
const controller = require('../../controller/usercontroller/controller')

router.get('/', veriytoken, controller.getUserController)
router.post('/chat', veriytoken, controller.getChatController)
router.post('/status', veriytoken, controller.getStatusController)

module.exports = router