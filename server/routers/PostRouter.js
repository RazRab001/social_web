const Router = require('express')
const router = new Router()
const postController = require('../controllers/PostController')

router.post('/:id', postController.create)
router.get('/:id', postController.get_all)

module.exports = router