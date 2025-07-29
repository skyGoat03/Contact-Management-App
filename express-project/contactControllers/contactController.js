const asyncHandler=require("express-async-handler");
const Contact= require("../models/contactModel.js");
const { default: mongoose } = require("mongoose");
const { constants } = require("../constants");
//@desc get all contacts 
//@route GET /api/contacts
//@access public
const getContacts=asyncHandler(async(req,res)=>{  
 const contacts = await Contact.find({user_id:req.user.id}); res.status(200).json(contacts) ;
})

//@desc post  contacts 
//@route post /api/contacts
//@access private

const createContact=asyncHandler(async(req,res)=>{  
  
  console.log("request body is",req.body);
  const{name,email,phone}=req.body;
  if(!name||!email||!phone){
    res.status(400);
    throw new Error("All fields are mandatory");
  }

const contact = await Contact.create({name,email,phone,user_id:req.user.id });  res.status(201).json(contact);
});

//@desc GET contact
//@route GET /api/contacts/id
//@access private
const getContact = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(constants.NOT_FOUND);
    throw new Error("Contact not found");
  }
 const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(constants.NOT_FOUND);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc update contact
//@route PUT /api/contacts/id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(constants.NOT_FOUND);
    throw new Error("Contact not found");
  }
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(constants.NOT_FOUND);
    throw new Error("Contact not found");
  }
  if (!contact.user_id || contact.user_id.toString() !== req.user.id) {
    res.status(constants.FORBIDDEN);
    throw new Error("User doesn't have permission to update this contact");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});


//@desc delete contact
//@route DELETE /api/contacts/id
//@access private
const deleteContact=asyncHandler(async(req,res) =>{
if(!mongoose.Types.ObjectId.isValid(req.params.id)){
  res.status(constants.NOT_FOUND);
  throw new Error("contact not found")
}
  const contact= await Contact.findById(req.params.id);
  if(!contact.user_id||contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("user dont have permission to update other user's contacts");
  }

const deletedContact = await Contact.findByIdAndDelete(req.params.id);
res.status(200).json(deletedContact);
});




module.exports = { getContacts,createContact,getContact,updateContact,deleteContact};