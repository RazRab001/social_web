const Router = require('express')
const router = new Router()
const userRouter = require('./UserRouter')
const chatRouter = require('./ChatRouter')
const postRouter = require('./PostRouter')

router.use('/user', userRouter)
router.use('/chat', chatRouter)
router.use('/post', postRouter)

module.exports = router