import {NextFunction, Request,Response} from 'express' ;
import { userUsecaseInterface,  } from '../../interfaces/users/userUsecases'

export class UserController {
    constructor( private userUsecase : userUsecaseInterface ) {}

    async loginUser(req:Request,res:Response,next:NextFunction) {
        try {
            let datas = req.body
            console.log(datas);
            const userDetails = await this.userUsecase.loginUser(datas)
            if(userDetails){                
               return res.status(200).json({userDetails})
            }
            res.status(400).json({message:"User Not Found"})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async signupUser(req: Request, res: Response,next:NextFunction) {
        try {
            const details =req.body
            console.log(req.body)
            const userDetails = await this.userUsecase.signupUser(details) 
            res.status(200).json({userDetails,valid:true})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

   async googleSignup(req:Request,res:Response,next:NextFunction){
    try {
        const userDetails = req.body
        const UserResponse = await this.userUsecase.GoogleSignup(userDetails)
        if(UserResponse){
            return res.status(200).json({userData:UserResponse})
        }
        res.status(404).json({message:"Failed"})

    } catch (error) {
        console.log(error);
        
    }
   }

    async getUser(req:Request,res:Response){
        try {
            let userEmail = req.body.email
            let users = await this.userUsecase.getUser(userEmail);
            if(users){
                res.status(200).json({users})
            }
            res.status(400).json({message:'User Not Found'});
            return;
        } catch (error) {
            console.log(error);
        }
    }


    async UserSignupOTP(req:Request,res:Response){
        try {
            let {email,otp} = req.body
            console.log(email,otp);
            const userData = await this.userUsecase.OtpVerification(req.body)
            console.log(userData);
            if(userData){

            }
            
            // let userOTP = await sendOtpEmail(userData,otp) 
            // if(users){
            //     res.status(200).json({users})
            // }
            // res.status(400).json({message:'User Not Found'});
            // return;
        } catch (error) {
            console.log(error);
        }
    }    

    async UserHome (req:Request,res:Response) {
        try {
            res.send('hello Social Media Users')
        }catch(err){
            console.log(err);
            
        }
    }

    async ResendOtp(req:Request,res:Response){
        try {
            
        } catch (error) {
            console.log(error);
            
        }
    }

    async Logout (req: Request,res:Response){
        try {
            res.send('Logout succefully')
        } catch (error) {
            console.log(error);
            
        }
    }
    
}



