import { NextFunction, Request, Response } from 'express';
import { userUsecaseInterface, } from '../../interfaces/users/userUsecases'
import { generateToken, getPayload } from '../../helper/JWT';
import { generateOtp } from '../../helper/nodemailer';

export class UserController {
    constructor(private userUsecase: userUsecaseInterface) { }


    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            let datas = req.body
            console.log(datas);
            const userDetails = await this.userUsecase.loginUser(datas)
            if (userDetails) {
                const token = generateToken(userDetails.email, userDetails.isAdmin)
                return res.status(200).json({ userDetails: userDetails, JWTtoken: token })
            }
            res.status(400).json({ message: "User Not Found" })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async UserfindById(req: Request, res: Response) {
        try {
            const user = req.query.id
            const userDetail = await this.userUsecase.userFindById(user + '')
            if (userDetail) {
                return res.status(200).json({ userDetail: userDetail })
            }
            res.status(205).json({ message: 'User Not Found' })
        } catch (error) {
            console.log(error);
        }
    }

    async UserFriendSuggession(req:Request,res:Response){
        try {
            const userId = req.query.userId
            console.log(userId);
            const suggessions = await this.userUsecase.friendSuggession(userId+'');
            if (suggessions) {
                return res.status(200).json({ suggessions: suggessions })
            }
            res.status(205).json({ message: 'Failed to fetch friend suggessions' })
        } catch (error) {
            console.log(error);
        }
    }

    async signupUser(req: Request, res: Response, next: NextFunction) {
        try {
            const details = req.body
            console.log(req.body)
            const userDetails = await this.userUsecase.signupUser(details);
            if (userDetails) {
                return res.status(200).json({ userDetails: userDetails })
            }
            res.status(205).json({ message: "Signup is Not Complete", valid: false })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async googleSignup(req: Request, res: Response, next: NextFunction) {
        try {
            const userDetails = req.body
            const UserResponse = await this.userUsecase.GoogleSignup(userDetails)
            console.log(UserResponse);
            if (UserResponse) {
                const token = generateToken(UserResponse.email, UserResponse.isAdmin)
                return res.status(200).json({ userData: UserResponse, JWTtoken: token })
            }
            return res.status(404).json({ message: "Failed" })
        } catch (error) {
            console.log(error);
        }
    }

    async FollowUsers(req:Request,res:Response){
        try {
            const {follower,user} = req.body
            console.log(follower,user);
            const FollowData = this.userUsecase.FollowUser(user,follower);
            if (FollowData) {
                return res.status(200).json({ message: 'Followed' })
            }
            return res.status(205).json({ message: 'Failed to Follow' })
        } catch (error) {
            console.log(error);
        }
    }

    async UserDetails(req: Request, res: Response) {
        try {
            const user = getPayload(req)
            const userData = await this.userUsecase.getUser(user?.email);
            if (userData?.isBlocked) {
                return res.status(217).json({ message: 'User Blocked' })
            }
            if (userData) {
                return res.status(200).json({ userData: userData })
            }
            return res.status(400).json({ message: "User Not Found" })
        } catch (error) {
            console.log(error);
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const user = getPayload(req)
            console.log(user);
            let users = await this.userUsecase.getUser(user?.email + '');
            console.log(users);
            if (users) {
                return res.status(200).json({ users: users })
            }
            return res.status(400).json({ message: 'User Not Found' });
        } catch (error) {
            console.log(error);
        }
    }

    async ForgotPassword(req: Request, res: Response) {
        try {
            console.log(req.body)
            const ChangedPassword = await this.userUsecase.forgotPassword(req.body)
            if (ChangedPassword) {
                return res.status(200).json({ ChangedPassword: ChangedPassword })
            }
            return res.status(401).json({ message: "User Not Found This Email" })
        } catch (error) {
            console.log(error);
        }
    }

    async AllUserDetails(req: Request, res: Response) {
        try {
            const { userId } = req.query
            console.log(userId)
            console.log(typeof userId)
            const UserDetails = await this.userUsecase.AllUserDetails(userId + '');
            if (UserDetails) {
                return res.status(200).json({ UserDetails: UserDetails  })
            }
            return res.status(205).json({ message: 'No User Found' });
        } catch (error) {
            console.log(error);
        }
    }

    async UserSignupOTP(req: Request, res: Response) {
        try {
            let { email, otp } = req.body
            console.log(email, otp);
            const userData = await this.userUsecase.OtpVerification(req.body)
            if (userData) {
                const token = generateToken(userData.email, userData.isAdmin)
                return res.status(200).json({ userData: userData , JWTtoken:token });
            }
            return res.status(203).json({ message: "Enter the correct OTP", userData: userData })
        } catch (error) {
            console.log(error);
        }
    }

    async UserChats(req: Request, res: Response) {
        try {
            const { userIdTo, userIdFrom } = req.query
            console.log(userIdFrom, userIdTo);
            const UserChatRes = await this.userUsecase.UserMessages(userIdFrom+'',userIdTo+'');
            if (UserChatRes) {
                return res.status(200).json({ UserChatRes: UserChatRes });
            }
            return res.status(205).json({ message: 'No Messages Found' });
        } catch (error) {
            console.log(error);
        }
    }

    async SavedUserPosts(req:Request,res:Response){
        try {
            const userId = req.query.userId
            const savedData = await this.userUsecase.SavedPosts(userId+'');
            if (savedData) {
                console.log(savedData);
                return res.status(200).json({ savedData: savedData });
            }
            return res.status(205).json({ message: 'No Saved Posts Found' });
        } catch (error) {
            console.log(error); 
        }
    } 

    async userSearchDetails(req: Request, res: Response) {
        try {
            const { search } = req.query
            console.log(search)
            const searchResult = await this.userUsecase.userSearch(search + '');
            if (searchResult) {
                return res.status(200).json({ searchResult: searchResult });
            }else if(searchResult === null){
                return res.status(205).json({ message: 'No User Found' });
            } 
            res.status(205).json({ message: 'No User Found' });
        } catch (error) {
            console.log(error);
        }
    }

    async ResendOtp(req: Request, res: Response) {
        try {
            let { email } = req.query
            const otpResend = await this.userUsecase.ResendOtp(email + '')
            if (otpResend) {
                return res.status(200).json({ message: "Otp Resend Successfully" })
            }
            return res.status(205).json({ message: "User Not Found" })
        } catch (error) {
            console.log(error);

        }
    }


}



