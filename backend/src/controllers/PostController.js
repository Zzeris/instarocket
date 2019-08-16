/* 
Dependecia utilizada para fazer redimencionamento de imagens, apenas funciona win64
const sharp = require('sharp');

Utilizado para caminhos relativos
const path = require('path');

Utilizado para excluir a imagem original
const fs = require('fs');
*/
const Post = require('../models/Post');

module.exports = {
    async index(req, res){
        const posts = await Post.find().sort('-createdAt');
        return res.json(posts);
    },
    async store(req, res){
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        const [name] = image.split('.');
        const filename = `${name}.jpg`;
        /*
        await sharp(req.file.path)
            .resize(500)
            .jpeg({quality: 70})
            .toFile(
                path.resolve(req.file.destination, 'resized', filename)
            )
        fs.unlinkSync(req.file.path);
        */
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: filename,
        })

        req.io.emit('post', post);

        return res.json(post);
    },
    async update(req, res){
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        const [name] = image.split('.');
        const filename = `${name}.jpg`;

        const post = await Post.findById(req.params.id);

        post.author = author;
        post.place = place;
        post.description = description;
        post.hashtags = hashtags;
        post.image = filename;

        await post.save();
        
        return res.json(post);
    }
};