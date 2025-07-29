const express = require("express");
const router = express.Router();
const {loginUser,registerUser,currentUser}=require("../contactControllers/userController.js")
const ValidateToken = require("../middleWare/ValidateTokenHandler.js")

router.post("/register",registerUser);

router.post("/login", loginUser);

router.post("/current",ValidateToken,currentUser);

module.exports=router;