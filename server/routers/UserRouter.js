const Router = require('express')
const router = new Router
const userController = require('../controllers/UserController')

router.post('/reg', userController.registration)
router.post('/log', userController.login)

module.exports = router