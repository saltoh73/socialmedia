import { userModel } from "../../../Models/User.model.js";
import  bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { nanoid } from "nanoid";
import { catchError } from "../../Middlewares/errorHandling.js";
import { AppError } from "../../utlis/Email/appError.js";



export const signUp=catchError(
    async(req,res,next)=>{

        const {email,lastName,firstName, password}=req.body
        const user= await userModel.findOne({email})
        if(user){
           next(new AppError('Error in Email Or Password'))
        }else{
            const hash = bcrypt.hashSync(password, 8);
            const result = await userModel.insertMany({lastName,firstName,password:hash,email}) 
            res.json({message:'success' , result})
        }
    
    }
)


export const getAll =async(req,res)=>{
    const user =await userModel.find()
    res.json({message:'success', user})
}

export const signIn =catchError(
    async(req,res,next)=>{
        const {email,password}=req.body
        const user = await userModel.findOne({email})
        if(!user || !await bcrypt.compare(password, user.password)){
    return   next(new AppError('Error in Email Or Password'))

        }
    
    
        user.password=undefined
        const token = jwt.sign({user}, 'kareem1')
        res.json({message:'success',token})
    
    }
)



export const forgetPassword= catchError(async(req,res,next)=>{
    const {email}=req.body
    const user = await userModel.find({email})
    if(user){
        let code =nanoid(6)
        const user= await userModel.findOneAndDelete({email},{code},{new:true})
        res.json({message:"success",code,user})
    }else{
         next(new AppError('Error '))

    }
})


export const UpdatePassword = catchError(async (req,res,next)=>{
    const {id}= req.params
    const {password}=req.body

const user=await userModel.findByIdAndUpdate(id,
    {
      password: await bcrypt.hash(password, 8),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  if (!user) {
    next(new AppError('Error '))

  }else{  
    res.status(200).json({ data: user });
}
}
)

// Other Answer for UpdatePassword

// export const UpdatePassword =async(req,res)=>{
    
//         const {token}=req.params
//         const {newPass,code}=req.body
    
    
//         jwt.verify(token,'kareem1',async (err,decoded)=>{
//             if(err){
//                 return next(new appError(err))
    
//             }else{
//                const user=   await userModel.findById(decoded.id)
//                   if(user){
//     const match=await bcrypt.compare( user.password,newPass)
//     if(match){
//         next(new appError('Failed Code'))
//     }else{
//         const hash = bcrypt.hashSync(newPass, 8)
//         const user= await userModel.updateOne({code},{password:hash},{new:true})
//     res.json({message:'Success'})
//     }
    
//                   }else{
//                     next(new appError('Failed Code'))
//                   }
//         // res.json({message:'success'})
//             }
//         })
      
        
    
// }

// -----------------------------------------------------------------------------------------

// User Profile

export const UpdateUser=catchError(async(req,res,next)=>{
    
    const {email,password,firstName,lastName}=req.body
    const user =await userModel.findOneAndUpdate({email,password,firstName,lastName})
    res.json({message:"success"},user)
   
})






export const deleteLoggedUser = catchError(async (req, res,next) => {
    await userModel.findByIdAndUpdate(req.user._id, { active: false });
    res.json({message:'sucess'});
  })





