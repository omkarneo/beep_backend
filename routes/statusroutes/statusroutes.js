const router = require('express').Router()
const controller = require('../../controller/statuscontroller/controller')
const veriytoken = require('../../middleware/jwt')



router.get('/', veriytoken, controller.fetchController)
router.get("/test", controller.statusTimeRemoverBot);
router.post('/create', veriytoken, controller.createStatusController)
router.get("/self",veriytoken,controller.fetchMyStatusContoller)

module.exports = router