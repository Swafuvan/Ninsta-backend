import { Loginuser, userObj,OTPData, googleUser, forgotPassword} from "../Users"

// this interface for userRepository
export interface userRepositoryInterface{
    getUser(userEmail:String):Promise<userObj | null>
    signupUser(user:userObj):Promise<userObj | null>
    loginUser(datas:Loginuser):Promise< userObj|null>
    OTPAddDatabase(email:string,otp:string):Promise<boolean>
    OTPChecking(OTPData):Promise<userObj | null>
    googleSignup(userData:googleUser)
    forgotPassword(userDetail:forgotPassword)
    userFindById(userid:string)
    AllUserDetails(userid:string);
    userSearch(search:string);
}