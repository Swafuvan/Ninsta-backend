
import { Loginuser, OTPData, forgotPassword, googleUser, userObj } from '../../interfaces/Users'
import { userRepositoryInterface } from "../../interfaces/users/userRepository";
import { Users } from "../../model/userModel";

export class userRepository implements userRepositoryInterface {
    async userFindById(userid: string) {
        try {
            const userDetails = await Users.findById(userid)
            if(userDetails){
                return userDetails
            }
            return null
        } catch (error) {
            console.log(error)
        }
    }

    async loginUser(datas: Loginuser): Promise<userObj | null> {
        try {
            console.log(datas.email,datas.password);
            
            const userDetails = await Users.findOne({ email: datas.email })
            console.log(userDetails);
            return userDetails as userObj;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async signupUser(user: userObj): Promise<userObj | null> {
        try {
            const createdUser = await Users.create({
                fullName: "user",
                email: user.email,
                username: user.username,
                password: user.password,
                isAdmin: false,
                image: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
                bio: "Hi Guys i am started Ninsta",
                DOB: "",
                Gender:"Default",
                isBlocked:false,
                following:[],
                followers:[]
                
            })
            return createdUser as userObj
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async getUser(userEmail: String): Promise<userObj | null> {
        try {
            const userDetails = await Users.findOne({ email: userEmail })
            console.log(userDetails);
            if(userDetails){
                return userDetails as userObj
            }
            return null
        } catch (error) {
            console.log(error);
            return null

        }
    }

    async forgotPassword(userDetail:forgotPassword){
        try {
            const {email,password} = userDetail
            console.log(email,password)
            const ChangedPassword = await Users.findOneAndUpdate({email:email},{$set:{
                password:password,
            }})
            if(ChangedPassword){
                return ChangedPassword
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }

    async googleSignup(userData:googleUser){
        try {
            console.log(userData);
            const createdUser = await Users.insertMany({
                fullName: userData.fullName,
                email: userData.email,
                username: userData.username,
                password: userData.password,
                isAdmin: false,
                image: userData.image,
                bio: "Hi Guys i am started Ninsta",
                DOB: "",
                Gender:"Default",
                isBlocked:false,
                following:[],
                followers:[]
            })
            if(createdUser){
                return createdUser 
            }
            return null
        } catch (error) {
            console.log(error);
            
        }
    }

    async OTPAddDatabase(email: string, otp: string): Promise<boolean> {
        const results = await Users.findOneAndUpdate({ email: email }, { $set: { OTP: otp } })
        if (results) {
            return true
        }
        return false
    }

    async OTPChecking(OtpDetails: OTPData): Promise<userObj | null> {
        try {
            const { email, otp } = OtpDetails
            console.log(email,otp)
            const checkingOTP = await Users.findOne({ email: email })
            if (checkingOTP) {
                if (checkingOTP?.OTP === otp.toString()) {
                    return checkingOTP as userObj;
                }
            }
            return null
        } catch (error) {
            console.log(error);
            throw error
        }
    }



}