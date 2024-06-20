import { adminRepositoryInterface } from "../../interfaces/admin/adminRepository";
import { AdminUsecasesInterface } from "../../interfaces/admin/adminUseCases";
import { Loginuser } from "../../interfaces/Users";
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
}