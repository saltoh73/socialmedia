import express from 'express'
import verifyToken from '../../Middlewares/auth.js'
import { uploadFile } from '../../utlis/Email/UploadFile.js'
import { addFile, addPost, Comment, deletePost, disLike, Follow, getAllPost, getOnePost, Like, UpdateOnePost, UpdatePost } from './posts.controller.js'
verifyToken

export const postRouter=express.Router()

postRouter.post('/',addPost)
postRouter.post('/addFile',uploadFile('file'),addFile)
postRouter.get('/',verifyToken,getAllPost)
postRouter.get('/:id', verifyToken,getOnePost)
postRouter.get('/follow/:id',verifyToken,Follow)
postRouter.put('/updatePost',verifyToken,UpdatePost)
postRouter.put('/updateOnePost/:id',verifyToken,UpdateOnePost)
postRouter.put('/like/:id',verifyToken,Like)
postRouter.put('/disLike/:id',verifyToken,disLike)
postRouter.put('/comment',verifyToken,Comment)
postRouter.delete('/:id',verifyToken,deletePost)
