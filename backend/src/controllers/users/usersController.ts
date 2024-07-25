import { NextFunction, Request, Response } from 'express';
import { userUsecaseInterface, } from '../../interfaces/users/userUsecases'
import { generateToken, getPayload } from '../../helper/JWT';
import { generateOtp } from '../../helper/nodemailer';

export class UserController {
    constructor(private userUsecase: userUsecaseInterface) { }

    
    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            let datas = req.body
            console.log(datas);
            const userDetails = await this.userUsecase.loginUser(datas)
            if (userDetails) {
                const token= generateToken(userDetails.email,userDetails.isAdmin)
                return res.status(200).json({ userDetails:userDetails,JWTtoken:token })
            }
            res.status(400).json({ message: "User Not Found" })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async UserfindById(req:Request,res:Response){
        try {
            const user = req.query.id
            const userDetail = await this.userUsecase.userFindById(user+'')
            if(userDetail){
                return res.status(200).json({userDetail:userDetail})
            }
            res.status(205).json({message:'User Not Found'})
        } catch (error) {
            console.log(error);
        }
    }

    async signupUser(req: Request, res: Response, next: NextFunction) {
        try {
            const details = req.body
            console.log(req.body)
            const userDetails = await this.userUsecase.signupUser(details);
            if (userDetails) {
                const token= generateToken(userDetails.email,userDetails.isAdmin)
                return res.status(200).json({ userDetails:userDetails,JWTtoken:token })
            }
            res.status(400).json({ message:"Signup is Not Complete", valid: false })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async googleSignup(req: Request, res: Response, next: NextFunction) {
        try {
            const userDetails = req.body
            const UserResponse = await this.userUsecase.GoogleSignup(userDetails)
            console.log(UserResponse);
            if (UserResponse) {
                const token= generateToken(UserResponse.email,UserResponse.isAdmin)
                return res.status(200).json({ userData: UserResponse,JWTtoken:token })
            }
            return res.status(404).json({ message: "Failed" })
        } catch (error) {
            console.log(error);
        }
    }
    
    async UserDetails(req:Request,res:Response){
        try {
            const user = getPayload(req)
            const userData = await this.userUsecase.getUser(user?.email);
            if (userData?.isBlocked) {
                return res.status(217).json({message:'User Blocked'})
            }
            if(userData){
                return res.status(200).json({ userData:userData })
            }
            return res.status(400).json({ message: "User Not Found" })
        } catch (error) {
            console.log(error); 
        }
    }

    async getUser(req: Request, res: Response) {
        try {
           const user = getPayload(req)
           console.log(user);
            let users = await this.userUsecase.getUser(user?.email+'');
            console.log(users);
            if (users) {
                return res.status(200).json({ users:users })
            }
            return res.status(400).json({ message: 'User Not Found' });
        } catch (error) {
            console.log(error);
        }
    }
    
    async ForgotPassword(req:Request,res:Response){
        try {
            console.log(req.body)
            const ChangedPassword = await this.userUsecase.forgotPassword(req.body)
            if(ChangedPassword){
                return res.status(200).json({ChangedPassword:ChangedPassword})
            }
            return res.status(401).json({message:"User Not Found This Email"})
        } catch (error) {
            console.log(error);
        }
    }


    async UserSignupOTP(req: Request, res: Response) {
        try {
            let { email, otp } = req.body
            console.log(email, otp);
            const userData = await this.userUsecase.OtpVerification(req.body)
            if (userData) {
                return res.status(200).json({userData:userData})
            }
            return res.status(203).json({message:"Enter the correct OTP",userData:userData})
        } catch (error) {
            console.log(error);
        }
    }


    async ResendOtp(req: Request, res: Response) {
        try {
            let { email } = req.query
            const otpResend = await this.userUsecase.ResendOtp(email+'')
            if(otpResend){
                return res.status(200).json({message:"Otp Resend Successfully"})
            }
            return res.status(205).json({message:"User Not Found"})
        } catch (error) {
            console.log(error);

        }
    }


}



