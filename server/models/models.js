const db = require('../db');
const { DataTypes } = require('sequelize');

const User = db.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    surname: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    birth_date: { type: DataTypes.DATE },
    password: { type: DataTypes.STRING, allowNull: false }
});

const Chat = db.define('chat', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const ChatUser = db.define('chat_user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Message = db.define('message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.TEXT, allowNull: false },
});

const Post = db.define('post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    img: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        validate: {
            isNotEmpty(value) {
                if (!value && !this.text) {
                    throw new Error('At least one of img or text must be provided');
                }
            },
        },
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
        validate: {
            isNotEmpty(value) {
                if (!this.img && !value) {
                    throw new Error('At least one of img or text must be provided');
                }
            },
        },
    },
});


// Define the associations
//User.belongsToMany(Chat, { through: ChatUser });
//Chat.belongsToMany(User, { through: ChatUser });

Chat.belongsToMany(User, { through: ChatUser});
User.belongsToMany(Chat, { through: ChatUser });

Chat.hasMany(Message)
Message.belongsTo(Chat)

User.hasMany(Post)
Post.belongsTo(User)

module.exports = {
    User,
    Message,
    ChatUser,
    Chat,
    Post,
};
