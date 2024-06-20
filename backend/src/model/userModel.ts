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
}) 

export const Users = mongoose.model("User",userScheme)