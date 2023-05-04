import mongoose from "mongoose";



const dbConnection=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/route-exam').then(()=>{
        console.log("database connected")
    }).catch((err)=>{
        console.log(err)
    })
}

export default dbConnection