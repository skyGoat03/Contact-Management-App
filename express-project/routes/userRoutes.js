const express = require("express");
const router = express.Router();
const {loginUser,registerUser,currentUser}=require("../contactControllers/userController.js")

router.post("/register",registerUser);

router.post("/login", loginUser);

router.post("/current",currentUser);

module.exports=router;