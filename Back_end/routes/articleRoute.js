// Required
const express = require("express");
const router = express.Router();
const articleCtrl = require("../controllers/articleCtrl");
const multer= require("../middlewares/multer-article");

// Routes

// ajout d'un article
router.post("/article", multer, articleCtrl.publishArticle);

// suppression d'un article
router.delete("/article/:id", multer, articleCtrl.deleteArticle)

// récupération de tous les articles
router.get("/article", articleCtrl.getAllArticles);

// récupération d'un article
router.get("/article/:id", articleCtrl.getOneArticle);

module.exports = router;