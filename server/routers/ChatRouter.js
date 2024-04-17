const Router = require('express')
const router = new Router
const chatController = require('../controllers/ChatController')

router.post('/:from_id/:to_id', chatController.send_message)
router.get('/:id', chatController.get_all_chats)
router.get('/:from_id/:to_id', chatController.get_one_chat)

module.exports = router