import { adminRepositoryInterface } from "../../interfaces/admin/adminRepository";
import { Loginuser, userObj } from "../../interfaces/Users";
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
            const response = await Users.find({isAdmin:false})
            if(response){
                return response
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }

    async UserBlocked (userEmail:any,isBlock:any){
        try {
            console.log(isBlock)
            const UserDetais = await Users.findOneAndUpdate({email:userEmail},{$set:{
                isBlocked:isBlock
            }})
            if(UserDetais){
                return UserDetais
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }

    async UserDetails(user:userObj){
        try {
            const UserDetails = await Users.findOneAndUpdate({_id:user.email},{$set:{
                email:user.email,
                username:user.username,
                fullName:user.fullName,
                image:user.image,
                DOB:user.DOB,
                bio:user.bio,
                password:user.password,
                isAdmin:user.isAdmin,
                Gender:user.Gender,
                isBloced:user.isBlocked
            }})
            
            if(UserDetails){
                return UserDetails
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }
}