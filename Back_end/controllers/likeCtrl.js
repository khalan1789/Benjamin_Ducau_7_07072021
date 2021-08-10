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
exports.controlAllLikes = async (req, res) => {
    const UserId = req.body.userId
    const ArticleId = req.body.articleId

    let articleLikedByUser
    try {
        if(await db.Like.findOne({ where : { UserId, ArticleId } })){
            articleLikedByUser = true
            return  res.status(200).json({ articleLikedByUser })
        }
        else {
            articleLikedByUser = false
            return  res.status(200).json({ articleLikedByUser })
        }
    } catch (error) {
            res.status(500).json({ error : "erreur serveur"})
    }          
};
