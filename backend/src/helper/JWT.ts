import Jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { userObj } from "../interfaces/Users";

export const generateToken = (email: string,isAdmin:boolean) => {
    return Jwt.sign({ email,isAdmin }, process.env.JWT_SECRET!, { expiresIn: '24h' });
};

interface JWTUserData {
    _id: string,
}

export interface CustomRequest extends Request {
    user?: JWTUserData;

}
type Middleware = (req: CustomRequest, res: Response, next: NextFunction) => void;

export const verifyToken: Middleware = (req, res, next) => {
    const token = req.headers["authorization"]?.replace('Bearer ', '');

    if (!token) { return res.status(401).json({ message: 'Access denied. No token provided.' }) }
    console.log(token);

    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload & JWTUserData
        console.log(decoded);
        req.user = decoded;
        next();

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

export const adminVerfication: Middleware = (req,res,next) =>{
    const token = req.headers["authorization"]?.replace('Bearer ', '');

    if (!token) { return res.status(401).json({ message: 'Access denied. No token provided.' }) }
    console.log(token);

    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload & JWTUserData
        if(decoded.isAdmin) {
            next();
        }else {
            return res.status(401).json({ message: 'Access denied. You are not an admin'})
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Invalid token.' });
    }
}

export const getPayload = (req:Request) => {
    const token = req.headers["authorization"]?.replace('Bearer ', '');
    try {
    if (!token) return null;
        return Jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;
    } catch (error) {
        console.error(error);
        return null;
    }
}