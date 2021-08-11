// Required
const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentCtrl")
const auth = require("../middlewares/Auth")

// routes

// ajout d'un commentaire à un article
router.post("/comment",auth, commentCtrl.publishComment);

// suppression d'un commentaire
router.delete("/comment/:id",auth, commentCtrl.deleteComment)

// récupération de tous les commentaires
router.get("/comment",auth, commentCtrl.getAllComments);

// récupération d'un commentaire
router.get("/comment/:id",auth, commentCtrl.getOneComment);

module.exports = router;