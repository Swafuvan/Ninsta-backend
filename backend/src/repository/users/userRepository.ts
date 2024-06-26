
import { Loginuser, OTPData, googleUser, userObj } from '../../interfaces/Users'
import { userRepositoryInterface } from "../../interfaces/users/userRepository";
import { Users } from "../../model/userModel";

export class userRepository implements userRepositoryInterface {

    async loginUser(datas: Loginuser): Promise<userObj | null> {
        try {
            console.log(datas.email,datas.password);
            
            const userDetails = await Users.findOne({ email: datas.email })
            console.log(userDetails);
            return userDetails as userObj
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
            return userDetails as userObj
        } catch (error) {
            console.log(error);
            return null

        }
    }

    async googleSignup(userData:googleUser){
        try {
            const createdUser = await Users.insertMany({
                fullName: userData.fullName,
                email: userData.email,
                username: userData.username,
                password: userData.password,
                isAdmin: false,
                image: userData.image,
                bio: "Hi Guys i am started Ninsta",
                DOB: "",
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
            const checkingOTP = await Users.findOne({ email: email })
            if (checkingOTP) {
                if (checkingOTP?.OTP === otp) {
                    return checkingOTP as userObj
                }
            }
            return null
        } catch (error) {
            console.log(error);
            throw error
        }
    }



}