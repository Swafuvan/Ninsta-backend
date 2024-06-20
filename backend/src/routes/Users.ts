import express from 'express';
import { UserController } from '../controllers/users/usersController';
import { userUsecase } from '../usecases/users/userUsecase';
import { userRepository } from '../repository/users/userRepository';
const userRepo = new userRepository()
const userusecase = new userUsecase(userRepo)
const userController = new UserController(userusecase)
const userRouter = express.Router();

userRouter.get('/', userController.getUser.bind(userController));

userRouter.post('/signup', userController.signupUser.bind(userController));

userRouter.post('/login', userController.loginUser.bind(userController));

userRouter.post('/verifyOtp',userController.UserSignupOTP.bind(userController));

userRouter.get('/resendOtp?email=',userController.ResendOtp.bind(userController));

userRouter.get('/logout',userController.Logout.bind(userController));

userRouter.post('/googleSignup',userController.googleSignup.bind(userController))


export default userRouter