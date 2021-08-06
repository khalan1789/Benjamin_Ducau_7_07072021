const db = require("../models");

exports.publishComment = async (req, res) => {
    try {
        const contain = req.body.contain;
        const ArticleId = req.body.articleId;
        const UserId = req.body.userId;

        await db.Comment.create({contain, ArticleId, UserId })
            .then(()=>  res.status(201).json({ message: "Commentaire ajouté avec succès !" }))
            .catch(error => res.status(500).json({ error : "erreur lors de la publication du commentaire"}))
    } catch (error) {
        return res.status(500).json({ error : "erreur serveur" });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const id = req.body.id;

        await db.Comment.destroy({ where : { id } })
            .then(()=>  res.status(200).json({ message: "Commentaire supprimé succès !" }))
            .catch(error => res.status(500).json({ error : "erreur lors de la suppression du commentaire"}))
    } catch (error) {
        return res.status(500).json({ error : "erreur serveur" });
    }
};