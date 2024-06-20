
import { userRepositoryInterface } from "../../interfaces/users/userRepository";
import { userUsecaseInterface } from "../../interfaces/users/userUsecases";
import { userObj, Loginuser, OTPData, googleUser } from '../../interfaces/Users'
import {sendOtpEmail,generateOtp} from '../../helper/nodemailer'
import bcrypt from 'bcrypt'


export class userUsecase implements userUsecaseInterface {
    constructor(private userRepository: userRepositoryInterface) { }

    
    async loginUser(datas: Loginuser): Promise<any> {
        try {
            let result = await this.userRepository.loginUser(datas);
            if (result) {
                let compared = await bcrypt.compare(datas.password,result?.password);
                if (compared) {
                    return result
                }
            }
            return null
        } catch (error) {
            console.log(error);

        }
    }

    async OTPAddDatabase(email:string,OTP:string){
        const DataAdd = await this.userRepository.OTPAddDatabase(email,OTP)
        return DataAdd
    }

    async signupUser(details: userObj): Promise<userObj | null> {
        try {
            console.log(details);
            details.password = await bcrypt.hash(details.password, 12)
            const CreatedUser = await this.userRepository.signupUser(details)
            if(CreatedUser){
                console.log(CreatedUser);
                const userOTP = await generateOtp()
                console.log("Sended OTP iS:"+userOTP);
                const OTPSending = await sendOtpEmail(CreatedUser.email,userOTP)
                const OTPSaved = await this.OTPAddDatabase(CreatedUser.email,userOTP)
                if(OTPSaved){
                    return CreatedUser;
                }
            }
            return null
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async getUser(userEmail: String): Promise<userObj | null> {
        return await this.userRepository.getUser(userEmail)
    }
    
    async GoogleSignup(UserData:googleUser){
        try {
            const userResult = await this.userRepository.googleSignup(UserData)
            return userResult
        } catch (error) {
            console.log(error);
            
        }
    }

    async OtpVerification(OtpDetails:OTPData): Promise<userObj| null>{
        const checkingOTP = await this.userRepository.OTPChecking(OtpDetails)
        return checkingOTP
    }

}