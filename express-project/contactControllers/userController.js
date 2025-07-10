const asyncHandler = require("express-async-handler")
const user = require("../models/userModel")
const bcrypt=require("bcrypt")

const loginUser = asyncHandler(async (req,res)=>{
             res.json({message:"login user"})
           }); 
                                              
const registerUser = asyncHandler(async (req,res)=>{

  const {username,email,password}=req.body;
  if(!username||!email||!password){
    res.status(400);
    throw new Error("All fields are mandatory");
  }             
  const userAvailable = await user.find({email});
  if(userAvailable){
    res.status(400);
    throw new Error("User already registred");
  }
  const hashedPasswords = await bcrypt.hash(password,10);
  console.log("hashed paswords",hashedPasswords);
    res.json({message:"Register the user"})});



const currentUser = asyncHandler(async (req,res)=>{
  res.json({message:"current user info"})
});


module.exports = {loginUser,registerUser,currentUser}