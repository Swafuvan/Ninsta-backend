import { adminRepositoryInterface } from "../../interfaces/admin/adminRepository";
import { Loginuser } from "../../interfaces/Users";
import { Users } from "../../model/userModel";

export class adminRepository implements adminRepositoryInterface {

    async AdminLogin(data: Loginuser) {
        try {
            const {email,password} = data
            const response = await Users.findOne({email})
            console.log(response);
            if(response){
                return response
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }

    async Usermanagement(){
        try {
            const response = await Users.find()
            console.log(response);
            if(response){
                return response
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }
}