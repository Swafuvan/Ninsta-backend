import { Loginuser, userObj } from "../Users";
export interface AdminUsecasesInterface{
    AdminLogin(data:Loginuser):Promise<any>
    UserManagement():Promise<any>
    UserDetails(user:userObj):Promise<any>
    UserBlocked(email:string,isBlock:string):Promise<any>
    adminDetails(email:string):Promise<any>
    userPostReport():Promise<any>
    userFindById(userId:string):Promise<any>
    postReportAction(postData:any):Promise<any>
    userReports():Promise<any>
    userReportAction(postData:any):Promise<any>
    allUserPost():Promise<any>
    
}