import express from 'express';
import {AdminControllers} from '../controllers/Admins/adminController';
import { adminRepository } from '../repository/Admin/adminRepository';
import { adminUseCases } from '../usecases/Admin/adminUsecases';
import { adminVerfication } from '../helper/JWT';
const AdminRepo = new adminRepository()
const Adminusecase = new adminUseCases(AdminRepo)
const adminController = new AdminControllers(Adminusecase)
const adminrouter = express.Router();


adminrouter.get('/userManagement',adminVerfication, adminController.getUser.bind(adminController));

adminrouter.post('/login',adminController.AdminLogin.bind(adminController));

adminrouter.post('/UserData',adminVerfication,adminController.UserDetails.bind(adminController));

adminrouter.get('/UserBlock',adminVerfication,adminController.UserBlocking.bind(adminController));

adminrouter.get('/adminData',adminVerfication,adminController.adminDetails.bind(adminController));

adminrouter.get('/userfindById',adminVerfication,adminController.UserFindById.bind(adminController));

adminrouter.put('/userReportAction',adminVerfication,adminController.UserReportAction.bind(adminController));

adminrouter.get('/userReports',adminVerfication,adminController.UserReportDetails.bind(adminController));

adminrouter.post('/postReport',adminVerfication,adminController.PostReportAction.bind(adminController));

adminrouter.get('/userPostReports',adminVerfication,adminController.userPostReport.bind(adminController));

export default adminrouter