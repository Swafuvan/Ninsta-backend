
import { userRepositoryInterface } from "../../interfaces/users/userRepository";
import { userUsecaseInterface } from "../../interfaces/users/userUsecases";
import { userObj, Loginuser, OTPData, googleUser, forgotPassword } from '../../interfaces/Users'
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
                    console.log('password match');
                    return result
                }
            }
            return null
        } catch (error) {
            console.log(error);

        }
    }

    async AllUserDetails(userId:string){
        try {
            const AllUserData = await this.userRepository.AllUserDetails(userId)
            return AllUserData
        } catch (error) {
            console.log(error)
        }
    }

    async userSearch(search:string){
        try {
            const SearchData = await this.userRepository.userSearch(search);
            if(SearchData){
                return SearchData
            }
        } catch (error) {
            console.log(error)
        }
    }

    async OTPAddDatabase(email:string,OTP:string){
        const DataAdd = await this.userRepository.OTPAddDatabase(email,OTP)
        return DataAdd
    }

    async userFindById(userid:string){
        try {
            const Userdata = await this.userRepository.userFindById(userid)
            return Userdata
        } catch (error) {
            console.log(error)
        }
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

    async ResendOtp(email:string){
        try {
            console.log(email)
            const otpResended = await generateOtp()
            console.log('New OTP is:'+otpResended)
            const otpSendingEmail = await sendOtpEmail(email,otpResended)
            const otpComplete = await this.OTPAddDatabase(email,otpResended)
            if(otpComplete){
                return otpComplete
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getUser(userEmail: String): Promise<userObj | null> {
        return await this.userRepository.getUser(userEmail)
    }

    async forgotPassword(userDetail:forgotPassword){
        try {
            userDetail.password = await bcrypt.hash(userDetail.password, 12)
            const ChangedData = await this.userRepository.forgotPassword(userDetail)
            if(ChangedData){
                return ChangedData
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }

    
    async GoogleSignup(UserData:googleUser){
        try {
            UserData.password = await bcrypt.hash(UserData.password, 12)
            const userResult = await this.userRepository.googleSignup(UserData)

            console.log(userResult);
            
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