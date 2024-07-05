import { Request, Response } from 'express';
import { userObj } from '../../interfaces/Users';
import { AdminUsecasesInterface } from '../../interfaces/admin/adminUseCases';


export class AdminControllers {
    constructor(private adminUseCases: AdminUsecasesInterface) { }
    async getUser(req: Request, res: Response) {
        try {
            const userDetails = await this.adminUseCases.UserManagement()
            if (userDetails) {
                return res.status(200).json({ userData: userDetails })
            }
            res.status(400).json({ message: "NO User Details" })
        } catch (error) {

        }
    }


    AdminHome(req: Request, res: Response) {
        try {
            res.send('this is admin Home');
        } catch (error) {
            console.log(error);
        }
    }

    async AdminLogin(req: Request, res: Response) {
        try {
            const details = req.body;
            const response = await this.adminUseCases.AdminLogin(details)
            if (response === null) {
                return res.status(400).json({ message: "User Not Autherised" })
            }
            res.status(200).json({ response })
        } catch (error) {
            console.log(error);
        }
    }

    async UserDetails(req: Request, res: Response) {
        try {
            const user = req.body
            console.log(user);
            const userDetails = await this.adminUseCases.UserDetails(user)
            if (userDetails) {
                return res.status(200).json({ userDetails: userDetails })
            }
            res.status(400).json({ message: "NO User Details" })
        } catch (error) {
            console.log(error)
        }
    }

    async UserBlocking(req: Request, res: Response) {
        try {
            console.log(req.query);
            const {email,isBlock} = req.query
            console.log(email,isBlock)
            const UserBlocked = await this.adminUseCases.UserBlocked(email+"",isBlock+"")
            if (UserBlocked) {
                return res.status(200).json({ message: "User Blocked" ,UserBlocked:UserBlocked})
            }  
            res.status(400).json({ message: "User Not Blocked" })
        } catch (error) {
            console.log(error);
        }
    }



}

