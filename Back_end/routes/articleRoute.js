// Required
const express = require("express");
const router = express.Router();
const articleCtrl = require("../controllers/articleCtrl");
const multer= require("../middlewares/multer-article");
const auth = require("../middlewares/Auth")

// Routes

// ajout d'un article
router.post("/article",auth , multer, articleCtrl.publishArticle);

// suppression d'un article
router.delete("/article/:id",auth , multer, articleCtrl.deleteArticle)

// récupération de tous les articles
router.get("/article",auth , articleCtrl.getAllArticles);

// récupération d'un article
router.get("/article/:id",auth , articleCtrl.getOneArticle);

module.exports = router;