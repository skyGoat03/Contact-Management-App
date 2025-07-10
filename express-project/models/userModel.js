const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  username:{
    type:String,
    required:[true,"enter user name"]
  },
  email:{
    type:String,
    required:[true,"enter email"],
    unique:[true,"email is already in use"]
  },
  password:{
    type:String,
    required:[true,"enter password"]
  },
  
},
                                   {
                                     timestamps:true
                                   });

module.exports=mongoose.model("User",userSchema);