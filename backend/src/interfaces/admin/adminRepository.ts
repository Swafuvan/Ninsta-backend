import { Loginuser } from "../Users";

export interface adminRepositoryInterface{
    AdminLogin(data:Loginuser):Promise<any>
    Usermanagement()
}