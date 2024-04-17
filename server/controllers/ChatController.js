const { User, Chat, ChatUser, Message } = require('../models/models');
const {where} = require("sequelize");

class ChatController {
    async send_message(req, res) {
        const { from_id, to_id } = req.params;
        const textValue = req.body.text;

        try {
            // Find chat users for 'from_id'
            const find_chatusers = await ChatUser.findAll({ where: { userId: from_id } });

            if (!find_chatusers || find_chatusers.length === 0) {
                return res.json("User doesn't exist");
            }

            let chatUserToId;

            for (const chatUser of find_chatusers) {
                chatUserToId = await ChatUser.findOne({ where: { chatId: chatUser.chatId, userId: to_id } });
                if (chatUserToId) {
                    break;
                }
            }

            if (!chatUserToId) {
                const newChat = await Chat.create({});
                const newChatUser = await ChatUser.create({ userId: to_id, chatId: newChat.id });
                const newChatUser1 = await ChatUser.create({ userId: from_id, chatId: newChat.id });

                const newMessage = await Message.create({ text: textValue, chatId: newChat.id });

                if (newMessage) {
                    // Successfully created the message
                    const userTo = await User.findOne({ where: { id: to_id } });
                    return res.json(`${newMessage.text} sent(new) to ${userTo.name} ${userTo.surname}`);
                } else {
                    return res.json("Error creating message");
                }
            } else {
                // Get the existing chat and create a new message in it
                const chat = await Chat.findOne({ where: { id: chatUserToId.chatId } });

                if (!chat) {
                    return res.json("Chat doesn't exist");
                }

                const message = await Message.create({ text: textValue, chatId: chat.id });

                if (message) {
                    const userTo = await User.findOne({ where: { id: to_id } });
                    return res.json(`${message.text} sent(old) to ${userTo.name} ${userTo.surname}`);
                } else {
                    return res.json("Error creating message");
                }
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async get_all_chats(req, res) {
        const {id} = req.params
        const user = await User.findOne({where: {id: id}})
        try{
            if(!user){
                res.json("Unknown user")
            }
            const chatuser = await ChatUser.findAll({where: {userId: id}})
            res.json(chatuser)
        } catch (e) {
            res.json(e.message)
        }
    }

    async get_one_chat(req, res){
        const { from_id, to_id } = req.params;

        // Find chat users for 'from_id'
        const find_chatusers = await ChatUser.findAll({ where: { userId: from_id } });

        if (!find_chatusers || find_chatusers.length === 0) {
            return res.json("User doesn't exist");
        }

        let chatUserToId;

        for (const chatUser of find_chatusers) {
            chatUserToId = await ChatUser.findOne({ where: { chatId: chatUser.chatId, userId: to_id } });
            if (chatUserToId) {
                //const chat = await Chat.findOne({where: {id: chatUser.chatId}})
                const messnges = await Message.findAll({
                    attributes: ["text"],
                    where: {chatId: chatUser.chatId}
                })
                if(messnges){
                    return res.json(messnges);
                }
            }
        }
        res.json("Empty dialog")
    }

}

module.exports = new ChatController();
