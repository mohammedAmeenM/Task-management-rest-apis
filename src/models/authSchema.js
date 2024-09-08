const mongoose = require('mongoose');

const authSchama = mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String, 
        minLength:6,
        required:true,
    }
},{
    timestamps: true,
})

const User = mongoose.model("User",authSchama);
module.exports=User