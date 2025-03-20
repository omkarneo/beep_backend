const router = require('express').Router()
const controller = require('../../controller/profilecontroller/controller')
const veriytoken = require('../../middleware/jwt')

router.get('/', veriytoken, controller.getProfileController)
router.post('/update', veriytoken, controller.updateprofileController)

module.exports = router