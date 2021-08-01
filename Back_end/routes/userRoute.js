// Required
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");
const multer= require("../middlewares/config-multer")

// Routes
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/profile/:id", userCtrl.getOneUser);
router.post("/profile/:id", userCtrl.getOneUser );
// router.post("/profile/infos", userCtrl.getOneUser)

module.exports = router;