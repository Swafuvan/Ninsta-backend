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

userRouter.get('/resendOtp',userController.ResendOtp.bind(userController));

userRouter.get('/user',verifyToken,userController.UserfindById.bind(userController));

userRouter.post('/forgotPassword',userController.ForgotPassword.bind(userController))

userRouter.post('/googleSignup',userController.googleSignup.bind(userController))

userRouter.use('/',postrouter)


export default userRouter