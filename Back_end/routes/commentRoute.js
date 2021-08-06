// Required
const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentCtrl")

// routes

// ajout d'un commentaire à un article
router.post("/comment", commentCtrl.publishComment);

// suppression d'un commentaire
router.delete("/comment/:id", commentCtrl.deleteComment)

module.exports = router;