const express = require("express");
const router = express.Router();

router.post("/register",(req,res)=>{
  res.json({message:"Register the user"});
});

router.post("/login", (req,res)=>{
  res.json({message:"login user"})
});

router.post("/current",(req,res)=>{
  res.json({message:"currentuser info"})
});

module.exports=router;