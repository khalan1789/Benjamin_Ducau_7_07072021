// Required
const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/likeCtrl")
const auth = require("../middlewares/Auth")

// Routes

// ajout d'un like
router.post("/like", auth, likeCtrl.likeArticle);

// récupération de tous les likes
router.get("/like", auth, likeCtrl.controlAllLikes)

module.exports = router;