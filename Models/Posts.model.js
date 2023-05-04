import mongoose from 'mongoose'

const postSchema =  mongoose.Schema({
          user:{
                    type:mongoose.Schema.Types.ObjectId,
                    required:true, 
                    ref:'user'
          },
          title:{
                    type:String,
                    required:true
          },
          image:{
                    type:String,
          },
          video:{
                    type:String,
          },
          like:{
                    type:Array,
          },
          dislike:{
                    type:Array,
          },
          path:String,
          comments:[
                    {
                              user:{
                                        type:mongoose.Schema.ObjectId,
                                        required:true,
                                        ref:'user'
                              },
                              username:{
                                        type:String,
                                        required:true
                              },
                              profile:{
                                        type:String
                              },
                              comment:{
                                        type:String,
                                        required:true
                              }
                    }
          ]
})

export const postModel = mongoose.model("post" , postSchema)
