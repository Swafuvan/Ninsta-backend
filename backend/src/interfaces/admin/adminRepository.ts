
import { Loginuser, userObj } from "../Users";

export interface adminRepositoryInterface{
    AdminLogin(data:Loginuser):Promise<any>
    Usermanagement():Promise<any>
    UserDetails(user:userObj):Promise<any>
    UserBlocked(Userdata:string,isBlock:string):Promise<any>
    adminDetails(email:string):Promise<any>
    userPostReport():Promise<any>
    userFindById(userId:string):Promise<any>
    postReportAction(postData:any):Promise<any>
    userReports():Promise<any>
    userReportAction(postData:any):Promise<any>
    allUserPost():Promise<any>

}