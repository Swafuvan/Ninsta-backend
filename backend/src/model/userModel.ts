import mongoose from "mongoose"

const userScheme = new mongoose.Schema({
    fullName:String,
    email:String,
    username:String,
    password:String,
    isAdmin:Boolean,
    DOB : String,
    bio : String,
    image : String,
    OTP: String ,
    Gender:{
        type:String,
        enum:["Default","male","female","Others"],
        default:"Default"
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
}) 

export const Users = mongoose.model("User",userScheme)