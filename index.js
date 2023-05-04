import express from 'express'
import dbConnection from './Database/dbConnection.js'
import { postRouter } from './src/modules/posts/posts.router.js'
import userRouter from './src/modules/user/user.router.js'
import { AppError } from './src/utlis/Email/appError.js'
const app = express()
const port = 3000
import cors from 'cors'


app.use(cors())
app.use(express.json())
app.use(express.static('uploads'))


dbConnection()

app.use('/user',userRouter)
app.use('/post',postRouter)



app.use((req,res,err,next)=>{
    let code=err.statusCode||500
    res.status(code).json({message:err.message,stack:err.stack})
})

app.use('*',(req,res,next)=>{
next(new AppError('invalid url',404))
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))