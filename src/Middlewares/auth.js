import jwt from 'jsonwebtoken'


const verifyToken= async(req,res)=>{
    const token = req.header('token')
    jwt.verify(token, 'kareem1', (decoded,err)=>{
        if(err){
            res.json(err)
        }else{
            req.userId=decoded.user._id
           next()
        }
    })
}


export default verifyToken