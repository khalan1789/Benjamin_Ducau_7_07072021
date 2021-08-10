// Required
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");
const multer= require("../middlewares/config-multer");
const passwordVerification = require("../middlewares/passwordSchema");
const auth = require("../middlewares/Auth")

// Routes
router.post("/signup", passwordVerification, userCtrl.signup);

router.post("/login", userCtrl.login);

router.get("/profile/:id",auth, userCtrl.getOneUser);

router.put("/profile/:id",auth, multer, userCtrl.addProfilePhoto );

router.delete("/profile/:id",auth, userCtrl.deleteUser)

router.get("/admin/users", userCtrl.getAllUsers)


module.exports = router;