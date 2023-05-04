import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required:true
    }, 
    lastName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true  
    } ,
    password:{
        type: String,
        required:true
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    resetCodeVerified: Boolean,

})

export const userModel= mongoose.model('user',userSchema)