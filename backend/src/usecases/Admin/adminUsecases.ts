import { adminRepositoryInterface } from "../../interfaces/admin/adminRepository";
import { AdminUsecasesInterface } from "../../interfaces/admin/adminUseCases";
import { Loginuser, userObj } from "../../interfaces/Users";
import bcrypt from 'bcrypt'



export class adminUseCases implements AdminUsecasesInterface {
    constructor(private adminRepository: adminRepositoryInterface) { }

    async AdminLogin(data: Loginuser) {
        try {
            let result = await this.adminRepository.AdminLogin(data)
            if (result) {
                const response = await bcrypt.compare(data.password, result?.password)
                if (response) {
                    return result
                }
            }
            return null
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async UserManagement() {
        try {
            const UserManagementData = await this.adminRepository.Usermanagement()
            if (UserManagementData) {
                return UserManagementData
            }
            return null
        } catch (error) {

        }
    }

    async UserDetails(user: userObj) {
        try {
            const UserDetailsData = await this.adminRepository.UserDetails(user)
            if (UserDetailsData) {
                return UserDetailsData
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }

    async UserBlocked(userEmail: any,isBlocked:string) {
        try {
            const Blocked = isBlocked === "false" ? true : false;
            console.log(userEmail, isBlocked, '111111111111111111111111111')
            const UserBlocked = await this.adminRepository.UserBlocked(userEmail,Blocked)
            if (UserBlocked) {
                return UserBlocked
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }
}