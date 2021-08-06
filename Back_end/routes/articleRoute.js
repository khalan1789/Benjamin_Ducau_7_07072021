// Required
const express = require("express");
const router = express.Router();
const articleCtrl = require("../controllers/articleCtrl");
const multer= require("../middlewares/multer-article");

// Routes

// ajout d'un article
router.post("/article", multer, articleCtrl.publish);

// modification d'un article (commentaires, likes)?
router.put("/article/:id");

// suppression d'un article

router.delete("/article/:id", multer, articleCtrl.deleteArticle)

module.exports = router;