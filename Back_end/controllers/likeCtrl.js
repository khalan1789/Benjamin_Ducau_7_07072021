// required
const db = require("../models");

// ajout/annulation d'un like
exports.likeArticle = async (req, res) => {
    try {
        const id = req.body.likeId
        const UserId = req.body.userId
        const ArticleId = req.body.articleId
        const rate = req.body.rate
        console.log("id : " + ArticleId + "/ " + UserId + "/ "+ rate + "/ ")

        // if(rate == 1 ){
        //     await db.Like.create({ UserId, ArticleId })
        //     .then(()=>  res.status(201).json({ message: "Like ajouté avec succès !" }))
        //     .catch(error => res.status(500).json({ error : "erreur lors de l'ajout du like"}))
        // } else {
        //     console.log("n'a pas pris le cas 1!")
        // }
        switch (rate){
            case 1 : 
            await db.Like.create({ UserId, ArticleId })
            .then(()=>  res.status(201).json({ message: "Like ajouté avec succès !" }))
            .catch(error => res.status(500).json({ error : "erreur lors de l'ajout du like"}))
            break;

            case 0 : 
            await db.Like.destroy({ where : { id }})
            .then(()=>  res.status(201).json({ message: "Like supprimé !" }))
            .catch(error => res.status(500).json({ error : "erreur lors de la suppression du like"}))
            break;
        }
    } catch (error) {
        return res.status(500).json({ error : "erreur serveur" });
    }
};

// récupération de tous les likes
exports.getAllLikes = async (req, res) => {
    try {
        await db.Like.findAll()
        .then(likes => res.status(200).json({ likes }))
        .catch(error => res.status(400).json({ error : "erreur lors de la récupération des likes"}))
    } catch (error) {
        res.status(500).json({ error : "erreur serveur"})
    }
};