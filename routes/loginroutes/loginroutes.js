const router = require('express').Router()
const { entrypointController, otpController } = require('../../controller/logincontroller/controller')

router.post('/entrypoint', entrypointController)
router.post('/otp', otpController)

module.exports = router