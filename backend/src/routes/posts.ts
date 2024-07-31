import express from 'express';
import { PostController } from '../controllers/PostController.ts/PostController';
import { PostRepository } from '../repository/Posts/PostRepository'; 
import { PostUsecases } from '../usecases/Posts/PostUsecases';
import { verifyToken } from '../helper/JWT';

const PostRepo = new PostRepository()
const PostUsecase = new PostUsecases(PostRepo)
const postControllers = new PostController(PostUsecase)
const postrouter = express.Router();


postrouter.post('/Posts',verifyToken,postControllers.UploadPosts.bind(postControllers))

postrouter.get('/allPosts',verifyToken,postControllers.AllPostData.bind(postControllers))

postrouter.post('/likePost',verifyToken,postControllers.LikePosts.bind(postControllers));

postrouter.post('/comment',verifyToken,postControllers.PostComment.bind(postControllers));

postrouter.get('/allComment',verifyToken,postControllers.AllComment.bind(postControllers));

postrouter.post('/postReports',verifyToken,postControllers.PostReports.bind(postControllers));

postrouter.get('/userAllPost',verifyToken,postControllers.AllUserPosts.bind(postControllers)); 

postrouter.post('/savePosts',verifyToken,postControllers.SaveUserPosts.bind(postControllers));

postrouter.post('/commentReply',verifyToken,postControllers.ReplyComments.bind(postControllers));

postrouter.post('/commentLike',verifyToken,postControllers.CommentLikes.bind(postControllers));

postrouter.get('/AllPostReports',verifyToken,postControllers.AllPostReports.bind(postControllers));

export default postrouter