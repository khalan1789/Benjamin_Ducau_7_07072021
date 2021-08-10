// Required
const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/likeCtrl")

// Routes

// ajout d'un like
router.post("/like", likeCtrl.likeArticle);

// récupération de tous les likes
router.get("/like", likeCtrl.controlAllLikes)

module.exports = router;