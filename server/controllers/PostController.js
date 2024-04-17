const { User, Post } = require('../models/models');
const path = require("path");
const uuid = require('uuid');
const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

// Добавляем middleware для обработки файлов
app.use(fileUpload());

class PostController {
    async create(req, res) {
        try {
            const { id } = req.params;
            let { text } = req.body;
            let fileName = null;

            if(req.files){
                const {img} = req.files;
                fileName = uuid.v4() + '.jpg';
                img.mv(path.resolve(__dirname, '..', 'static', fileName));
            }

            const user = await User.findOne({ where: { id: id } });
            if (!user) {
                return res.json("User doesn't exist");
            }

            const post = await Post.create({ img: fileName, text: text, userId: user.id });
            if (post) {
                res.json(`Post img:${post.img} text:${post.text} added`);
            } else {
                res.json("Post error");
            }
        } catch (e) {
            res.json(e.message);
        }
    }

    async get_all(req, res){
        const {id} = req.params;
        const user = await User.findOne({ where: { id: id } });
        if (!user) {
            return res.json("User doesn't exist");
        }

        const posts = await Post.findAll({where: {userId: id}})
        res.json(posts)
    }
}

module.exports = new PostController();
