import { Loginuser, userObj } from "../Users";

export interface AdminUsecasesInterface{
    AdminLogin(data:Loginuser)
    UserManagement():Promise<userObj[]>
}