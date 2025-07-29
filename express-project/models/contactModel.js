const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

const contactSchema = mongoose.Schema({
  
  user_id: {
  type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
  }, 
  name:{
    type:String,
    required:[true,"Please add your contact name"]
  },
  email:{
    type:String,
    required:[true,"Please add email id"],
  },
  phone:{
    type: String,
    required:[true,"Please add pgone number"],
  },
},
  {
    timestamps:true
  },
  
                                    );

module.exports = mongoose.model("contact",contactSchema);