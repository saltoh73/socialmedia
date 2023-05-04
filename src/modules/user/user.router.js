import express from 'express'
import verifyToken from '../../Middlewares/auth.js'
import { deleteLoggedUser, forgetPassword, getAll, signIn, signUp, UpdatePassword, UpdateUser } from './user.controller.js'

const userRouter=express.Router()


userRouter.post('/signUp', signUp)
userRouter.post('/signIn', signIn)
userRouter.put('/updatePassword/:id', UpdatePassword)
userRouter.put('/forgetPassword', forgetPassword)
userRouter.put('/updateUser',UpdateUser)
userRouter.put('/deletedLogin', verifyToken ,deleteLoggedUser)
userRouter.get('/', getAll)

export default userRouter