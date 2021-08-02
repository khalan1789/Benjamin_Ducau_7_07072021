// Required
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");
const multer= require("../middlewares/config-multer");
const passwordVerification = require("../middlewares/passwordSchema");

// Routes
router.post("/signup", passwordVerification, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/profile/:id", userCtrl.getOneUser);
router.put("/profile/:id", multer, userCtrl.addProfilePhoto );
router.delete("/profile/:id", userCtrl.deleteUser)


module.exports = router;