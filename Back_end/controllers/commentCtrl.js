// required
const db = require("../models");

// publication d'un commentaire
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

// suppression d'un commentaire
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

// récupération de tous les commentaires
exports.getAllComments = async (req, res) => {
    try {
        await db.Comment.findAll()
        .then(comments => res.status(200).json({ comments }))
        .catch(error => res.status(400).json({ error : "erreur lors de la récupération des commentaires"}))
    } catch (error) {
        res.status(500).json({ error : "erreur serveur"})
    }
};

// récupération d'un commentaire
exports.getOneComment = async (req, res) => {
    try {
        const id = req.params.id
        await db.Comment.findOne({ where : { id }})
        .then(comment => res.status(200).json({ comment }))
        .catch(error => res.status(400).json({ error : "erreur lors de la récupération du commentaire"}))
    } catch (error) {
        res.status(500).json({ error :"erreur serveur"})
    }
};