import { Request, Response } from 'express';
import { userObj } from '../../interfaces/Users';
import { AdminUsecasesInterface } from '../../interfaces/admin/adminUseCases';


export class AdminControllers {
    constructor(private adminUseCases: AdminUsecasesInterface) { }
    async getUser(req: Request, res: Response) {
        try {
            const userDetails = await this.adminUseCases.UserManagement()
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
                return res.status(400).json({message:"User Not Autherised"})
            }
             res.status(200).json({ response })
        } catch (error) {
            console.log(error);
        }
    }

}

