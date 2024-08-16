import { adminRepositoryInterface } from "../../interfaces/admin/adminRepository";
import { AdminUsecasesInterface } from "../../interfaces/admin/adminUseCases";
import { Loginuser, userObj } from "../../interfaces/Users";
import bcrypt from 'bcrypt'



export class adminUseCases implements AdminUsecasesInterface {
    constructor(private adminRepository: adminRepositoryInterface) { }
    async postReportAction(postData: any) {
        try {
            const responseData = await this.adminRepository.postReportAction(postData)
            if(responseData){
                return responseData
            }
        } catch (error) {
            console.log(error)
        }
    }

async userReportAction(data:any){
        try {
            const responseData = await this.adminRepository.userReportAction(data)
            if(responseData){
                return responseData
            }
        } catch (error) {
            console.log(error)
        }
    }


    async userReports(){
        try {
            const userDetails = await this.adminRepository.userReports();
            if(userDetails){
                return userDetails
            }
        } catch (error) {
            console.log(error);
        }
    }

    async userFindById(userId: string) {
        try {
            const userDetails = await this.adminRepository.userFindById(userId)
            if (userDetails) {
                return userDetails
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    async userPostReport() {
        try {
            const userPostReport = await this.adminRepository.userPostReport()
            if (userPostReport) {
                return userPostReport
            }
        } catch (error) {
            console.log(error);
        }
    }

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

    async adminDetails(email: string) {
        try {
            const adminDetailsData = await this.adminRepository.adminDetails(email)
            if (adminDetailsData) {
                return adminDetailsData
            }
            return null
        } catch (error) {
            console.log(error);
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
            
            console.log(userEmail, isBlocked, '111111111111111111111111111')
            
            const UserBlocked = await this.adminRepository.UserBlocked(userEmail,isBlocked)
            if (UserBlocked) {
                return UserBlocked
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }
}