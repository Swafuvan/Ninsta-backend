import { Loginuser, userObj } from "../Users";

export interface adminRepositoryInterface{
    AdminLogin(data:Loginuser):Promise<any>
    Usermanagement()
    UserDetails(user:userObj)
    UserBlocked(Userdata:string,isBlock:boolean);
}