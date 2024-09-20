import { Request, response, Response } from 'express';
import { userObj } from '../../interfaces/Users';
import { AdminUsecasesInterface } from '../../interfaces/admin/adminUseCases';
import { adminVerfication, generateToken, getPayload } from '../../helper/JWT';


export class AdminControllers {
    constructor(private adminUseCases: AdminUsecasesInterface) { }
    async getUser(req: Request, res: Response) {
        try {
            const {currentPage,userCount} = req.query
            
            const userDetails = await this.adminUseCases.UserManagement()
            if (userDetails) {
                return res.status(200).json({ userData: userDetails.response,totalUsers:userDetails.totalUsers })
            }
            res.status(400).json({ message: "NO User Details" })
        } catch (error) {

        }
    }

    async UserReportAction(req:Request,res:Response){
        try {
            const data = req.body;
            console.log(data,'12121212121212121212')
            const userReport = await this.adminUseCases.userReportAction(data);
            if (userReport) {
                return res.status(200).json({ userReport: userReport })
            }
            res.status(205).json({ message: 'Failed to report user' })
        } catch (error) {
            console.log(error);
        }
    }

    async UserReportDetails(req:Request,res:Response){
        try {
            const userReports = await this.adminUseCases.userReports();
            if (userReports) {
                return res.status(200).json({ userReports: userReports })
            }
            res.status(205).json({ message: "No User Reports" })
        } catch (error) {
            console.log(error);
        }
    }

    async findAllUserPost(req:Request,res:Response){
        try {
            const allUserPost = await this.adminUseCases.allUserPost();
            if (allUserPost) {
                return res.status(200).json({ allUserPost: allUserPost })
            }
            res.status(205).json({ message: "No User Posts" })
        } catch (error) {
            console.log(error)
        }
    }

    async userPostReport(req: Request, res: Response) {
        try {
            const userReport = await this.adminUseCases.userPostReport()
            if (userReport) {
                return res.status(200).json({ userReport: userReport })
            }
            res.status(205).json({ message: 'Failed to fetch user post report' })
        } catch (error) {
            console.log(error)
        }
    }

    async PostReportAction(req: Request, res: Response) {
        try {
            const data = req.body
            const reportResponse = await this.adminUseCases.postReportAction(data);
            if (reportResponse) {
                return res.status(200).json({ reportResponse: reportResponse })
            }
            res.status(205).json({ message: 'Failed to report post' })
        } catch (error) {
            console.log(error)
        }
    }

    async AdminLogin(req: Request, res: Response) {
        try {
            const details = req.body;
            const response = await this.adminUseCases.AdminLogin(details)
            if (response === null) {
                return res.status(200).json({ status: false, message: "User Not Autherised" })
            }
            const adminToken = generateToken(response.email, response.isAdmin)
            res.status(200).json({ status: true, response: response, adminToken })
        } catch (error) {
            console.log(error);
        }
    }

    async UserFindById(req: Request, res: Response) {
        try {
            const userId = req.query.userId
            const userData = await this.adminUseCases.userFindById(userId + '')
            if (userData) {
                return res.status(200).json({ userData: userData })
            }
            res.status(205).json({ message: 'User Not Found' })
        } catch (error) {
            console.log(error)
        }
    }

    async UserDetails(req: Request, res: Response) {
        try {
            const user = req.body
            const userDetails = await this.adminUseCases.UserDetails(user)
            if (userDetails) {
                return res.status(200).json({ userDetails: userDetails })
            }
            res.status(400).json({ message: "NO User Details" })
        } catch (error) {
            console.log(error)
        }
    }

    async adminDetails(req: Request, res: Response) {
        try {
            const admin = getPayload(req)
            const adminData = await this.adminUseCases.adminDetails(admin?.email)
            if (adminData) {
                return res.status(200).json({ adminData: adminData })
            }
            return res.status(205).json({ message: "NO Admin Details" })
        } catch (error) {
            console.log(error)
        }
    }

    async UserBlocking(req: Request, res: Response) {
        try {
            const { User, isBlock } = req.query
            console.log(User, isBlock);
            const UserBlocked = await this.adminUseCases.UserBlocked(User + "", isBlock + "")
            if (UserBlocked) {
                return res.status(200).json({ message: "User Blocked", UserBlocked: UserBlocked })
            }
            res.status(400).json({ message: "User Not Blocked" })
        } catch (error) {
            console.log(error);
        }
    }

}

