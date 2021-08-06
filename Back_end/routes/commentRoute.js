// Required
const express = require("express");
const router = express.Router();

// routes

// ajout d'un commentaire à un article
router.post("/comment");

// suppression d'un commentaire

router.delete("/comment/:id")