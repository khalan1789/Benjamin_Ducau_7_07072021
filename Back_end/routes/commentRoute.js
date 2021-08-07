// Required
const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentCtrl")

// routes

// ajout d'un commentaire à un article
router.post("/comment", commentCtrl.publishComment);

// suppression d'un commentaire
router.delete("/comment/:id", commentCtrl.deleteComment)

// récupération de tous les commentaires
router.get("/comment", commentCtrl.getAllComments);

// récupération d'un commentaire
router.get("/comment/:id", commentCtrl.getOneComment);

module.exports = router;