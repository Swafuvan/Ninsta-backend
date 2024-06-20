import express from 'express';
import {AdminControllers} from '../controllers/Admins/adminController';
import { adminRepository } from '../repository/Admin/adminRepository';
import { adminUseCases } from '../usecases/Admin/adminUsecases';
const AdminRepo = new adminRepository()
const Adminusecase = new adminUseCases(AdminRepo)
const adminController = new AdminControllers(Adminusecase)
const adminrouter = express.Router();


adminrouter.get('/', adminController.AdminHome.bind(adminController));

adminrouter.get('/userManagement', adminController.getUser.bind(adminController));

adminrouter.post('/login',adminController.AdminLogin.bind(adminController))

export default adminrouter