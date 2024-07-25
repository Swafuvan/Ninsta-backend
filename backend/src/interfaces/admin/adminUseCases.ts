import { Loginuser, userObj } from "../Users";

export interface AdminUsecasesInterface{
    AdminLogin(data:Loginuser)
    UserManagement():Promise<userObj[]>
    UserDetails(user:userObj)
    UserBlocked(email:string,isBlock:string)
    adminDetails(email:string);
    userPostReport();
    userFindById(userId:string)
    postReportAction(postData:any)
}