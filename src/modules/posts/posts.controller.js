import { postModel } from "../../../Models/Posts.model.js";
import { catchError } from "../../Middlewares/errorHandling.js";
import { AppError } from "../../utlis/Email/appError.js";

export const addPost=catchError(async(req , res,next)=>{
 
      const {title , image , video} = req.body;
      const {user}=req.user.id
      const post = await postModel.insertMany({ title , image , video , user})
 
      res.json({message:'success',post})

})


export const getAllPost=async(req,res,next)=>{
    const user=await postModel.find({})
    res.json({message:'success',user})

}


export const getOnePost=async(req,res,next)=>{
    const {id}=req.params
    const user=await postModel.findById(id)
    res.json({message:'success',user})

}







export const UpdatePost=catchError(async(req,res,next)=>{
      const {id}=req.params
  
      const post = await postModel.findById(id);
      if(!post){
       return next(new AppError('Post does not found'))
      }
      
    const  posts = await postModel.findByIdAndUpdate(id , {
       $set:req.body
      })
      res.json({message:'success',posts})
  
  
  })





export const UpdateOnePost=catchError(async(req,res,next)=>{

      const {id}=req.params
  
  
      const post = await postModel.findById(id);
      if(!post){
       return next(new AppError('Post does not found'))
      };
      
      const posts = await postModel.findByIdAndUpdate(id , {
       $set:req.body
      })
      res.json({message:'success',posts})})






export const Like=catchError(async(req,res,next)=>{

      const {id}=req.params
  
  
  
      const post = await postModel.findById(id);
              if(!post.like.includes(req.user.id)){
                    if(post.dislike.includes(req.user.id)){
                          await postModel.updateOne({$pull:{dislike:req.user.id}})
                    }
                    await postModel.updateOne({$push:{like:req.user.id}})
                    return res.json({message:"Post has been liked"})
                    
              }else{
                    await postModel.update({$pull:{like:req.user.id}});
                    return next(new AppError('Post does not Disliked'))
              }
  }
  )


export const disLike=catchError(async(req,res,next)=>{

      const {id}=req.params
  
  
      const post = await postModel.findById(id);
      if(!post.dislike.includes(req.user.id)){
            if(postModel.like.includes(req.user.id)){
                  await post.updateOne({$pull:{like:req.user.id}})
            }
            await postModel.updateOne({$push:{dislike:req.user.id}})
            return res.json({message:"Post has been disliked"})
      }else{
            await postModel.updateOne({$pull:{dislike:req.user.id}});
            return next(new AppError('Error'))
      }
  })


export const Comment =catchError(async(req,res,next)=>{

      const {comment , postid , profile} = req.body;
      const comments={user:req.user.id,username:req.user.username,comment,profile}
      const post = await postModel.findById(postid);
      post.comments.push(comments);
      await post.save();
      res.json(post);
}  )



export const deletePost=catchError(async(req,res,next)=>{

      const {id}=req.params
  
  
      const post = await postModel.findById(id);
      if(post.user === req.user.id){
            const deletepost = await post.findByIdAndDelete(id);
            return res.json({message:"You post has been deleted"})
      }else{
            next(new AppError('Post does not deleted'))      }
  }
  )

// Get Follow

export const Follow=catchError(async(req,res,next)=>{
      const {id}=req.params
  
      const user = await postModel.findById(id);
      const following = await Promise.all(
            user.Following.map((item)=>{
                  return postModel.findById(item)
            })
      )
  
      let followingList=[];
      following.map((person)=>{
            const {email, password , phonenumber , Following , Followers , ...others} = person._doc;
            followingList.push(others);
      })
  }
  )



export const addFile=catchError(async (req,res,next)=>{
      const{user}=req.body
      await bookModel.insertMany({path: req.file.filename, user})
      res.json({message:'success'})
  })