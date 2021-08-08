// required
const db = require("../models");
const fs = require("fs");

// publication d'un article
exports.publishArticle = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.body.title)
        console.log(req.body.contain)
        console.log(req.body.userId)
        const articleContain = req.file ? 
        {
            UserId: req.body.userId,
            title : req.body.title,
            contain : req.body.contain,
            imageUrl : `${req.protocol}://${req.get('host')}/articlesImages/${req.file.filename}`
        } : {
            UserId: req.body.userId,
            title : req.body.title,
            contain : req.body.contain
        };
        console.log(articleContain);
        if (req.body.title == null || !req.body.title){
            return res.status(400).json({ error : "Un titre est obligatoire"})
        }
        else if (!req.body.contain && !req.file){
            return res.status(400).json({ error : "L'article doit contenir au moins un texte ou une image"})
        }
        else{
            await db.Article.create({ UserId :articleContain.UserId, title: articleContain.title, contain: articleContain.contain, imageUrl: articleContain.imageUrl  })
            .then(()=>  res.status(201).json({ message: "Article publié avec succès !" }))
            .catch(error => res.status(500).json({ error : "erreur lors de la création de l'article"}))
        }
    } catch (error) {
        return res.status(500).json({ error : "erreur serveur" });
    }
};

// suppression d'un article
exports.deleteArticle = async (req, res) => {
    try {
        const id = req.body.id
        
        await db.Article.findOne({ where: { id } })
        .then(article => {
            // l'article contient-il une image?
            if(article.fileUrl == null) {
                db.Article.destroy({ where: { id } })
                .then(() => {
                  res.status(200).json({
                    message: "suppression de l'article effectuée "
                  })
                })
                .catch((error) => res.status(401).json({ error })) 
            } else {
            const filename = article.fileUrl.split('/images/')[1];
            fs.unlink(`articlesImages/${filename}`, () => {
                db.Article.destroy({ where: { id } })
                .then(() => {
                  res.status(200).json({
                    message: "suppression de l'article effectuée "
                  })
                })
                .catch((error) => res.status(401).json({ error })) 
            })
            }
        })    
    }
    catch (error) {
      res.status(500).json({ error : "erreur serveur" })
    }
};

// récupération de tous les articles
exports.getAllArticles = async (req, res) => {
    try {
        await db.Article.findAll({
        include : [
            {model : db.User, attributes : ["firstname", "lastname"]},
            {model : db.Like},
            {model : db.Comment}
        ]
        })
            .then(articles => res.status(200).json({ articles }))
            .catch(error => res.status(400).json({ error : "erreur lors de la récupération des articles"}))
    } catch (error) {
        res.status(500).json({ error : "erreur serveur"})
    }
};

// récupération d'un article
exports.getOneArticle = async (req, res) => {
    try {
        const id = req.params.id
        await db.Article.findOne({ where : { id }})
        .then(article => res.status(200).json({ article }))
        .catch(error => res.status(400).json({ error : "erreur lors de la récupération de l'article"}))
    } catch (error) {
        res.status(500).json({ error : "erreur lors de la récupération de l'article"})
    }
};