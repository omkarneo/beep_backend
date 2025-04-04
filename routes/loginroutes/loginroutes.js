const router = require('express').Router()
const { entrypointController, otpController } = require('../../controller/logincontroller/controller')
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Retrieve a list of users
 *     description: Returns a list of users.
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.post('/entrypoint', entrypointController)
router.post('/otp', otpController)

module.exports = router