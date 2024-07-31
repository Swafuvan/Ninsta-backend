import { Loginuser, OTPData, forgotPassword, googleUser, userObj } from "../Users"

export interface userUsecaseInterface{
    getUser(userEmail:string):Promise<userObj | null>
    signupUser(details:userObj):Promise<userObj | null>
    loginUser(datas:Loginuser):Promise< userObj >
    OtpVerification(OtpDetails:OTPData):Promise<userObj | null>
    OTPAddDatabase(email:string,otp:string):Promise<boolean>
    GoogleSignup(userData:googleUser)
    forgotPassword(userDetail:forgotPassword)
    userFindById(userid:string)
    ResendOtp(email:string);
    AllUserDetails(userid:string);
    userSearch(search:string);
}