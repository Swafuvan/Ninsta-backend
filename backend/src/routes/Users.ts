import express from 'express';
import { UserController } from '../controllers/users/usersController';
import { userUsecase } from '../usecases/users/userUsecase';
import { userRepository } from '../repository/users/userRepository';
import { generateToken,verifyToken } from '../helper/JWT';
import postrouter from './posts';
const userRepo = new userRepository()
const userusecase = new userUsecase(userRepo)
const userController = new UserController(userusecase)
const userRouter = express.Router();

userRouter.get('/',verifyToken,userController.getUser.bind(userController));

userRouter.get('/userData',verifyToken,userController.UserDetails.bind(userController))

userRouter.post('/signup', userController.signupUser.bind(userController));

userRouter.post('/login', userController.loginUser.bind(userController));

userRouter.post('/verifyOtp',userController.UserSignupOTP.bind(userController));

userRouter.get('/notification',verifyToken,userController.userNotification.bind(userController));

userRouter.get('/chat',verifyToken,userController.UserChats.bind(userController));

userRouter.get('/resendOtp',userController.ResendOtp.bind(userController));

userRouter.post('/follow',verifyToken,userController.FollowUsers.bind(userController));

userRouter.get('/savedPosts',verifyToken,userController.SavedUserPosts.bind(userController));

userRouter.put('/blockUser',verifyToken,userController.BlockUsers.bind(userController));

userRouter.get('/suggession',verifyToken,userController.UserFriendSuggession.bind(userController));

userRouter.get('/user',verifyToken,userController.UserfindById.bind(userController));

userRouter.get('/allMessage',verifyToken,userController.AllUserMessages.bind(userController));

userRouter.get('/AllUsers',verifyToken,userController.AllUserDetails.bind(userController));

userRouter.get('/stories',verifyToken,userController.UserFriendsStories.bind(userController));

userRouter.post('/userStory',verifyToken,userController.UserStoryAdding.bind(userController));

userRouter.post('/reportUser',verifyToken,userController.UserReporting.bind(userController));

userRouter.get('/userReels',verifyToken,userController.UserReels.bind(userController));

userRouter.get('/userSearch',verifyToken,userController.userSearchDetails.bind(userController));

userRouter.post('/forgotPassword',userController.ForgotPassword.bind(userController));

userRouter.post('/editProfile',verifyToken,userController.EditUserProfile.bind(userController));

userRouter.post('/googleSignup',userController.googleSignup.bind(userController))

userRouter.use('/',postrouter)


export default userRouter