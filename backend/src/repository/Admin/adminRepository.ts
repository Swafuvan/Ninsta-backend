import { adminRepositoryInterface } from "../../interfaces/admin/adminRepository";
import { Loginuser, userObj } from "../../interfaces/Users";
import { Posts } from "../../model/postModel";
import { PostReports } from "../../model/postReport";
import { Users } from "../../model/userModel";
import { UserReports } from "../../model/userReportModel";

export class adminRepository implements adminRepositoryInterface {
    async postReportAction(postData: any) {
        try {
            const postReport = await PostReports.findById(postData._id)
            const postChange = await Posts.findById(postReport?.postId)
            if (postChange) {
                postChange.visibile = !postChange.visibile
                await postChange.save()
            } 
            if(postReport){
                postReport.solve = !postReport.solve 
                await postReport?.save();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async userReportAction(data:any){
        try {
            console.log(data)
            const userDetails = await UserReports.findById(data._id);
            if (userDetails) {
                const userBlocking = await Users.findById(data.userId);
                if (userBlocking) {
                    userBlocking.isBlocked =!userBlocking.isBlocked
                    await userBlocking.save();
                }
                if(userDetails){
                    userDetails.solve =!userDetails.solve
                    await userDetails.save();
                }
                return userDetails
            }
        } catch (error) {
            console.log(error);
        }
    }

    async userReports(){
        try {
            const userReport = await UserReports.find().populate('userId').populate('reportedBy');
            if(userReport){
                return userReport
            }
        } catch (error) {
            console.log(error);
        }
    }

    async userFindById(userId: string) {
        const userDetails = await Users.findById(userId)
        if (userDetails) {
            return userDetails
        }
        return null
    }
    async userPostReport() {
        try {
            const postReport = await PostReports.find().populate('postId').populate('reportedBy')
            if (postReport) {
                return postReport
            }
            return null
        } catch (error) {
            console.log(error)
        }
    }

    async AdminLogin(data: Loginuser) {
        try {
            const { email, password } = data
            const response = await Users.findOne({ email })
            if (response) {
                return response
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }

    async Usermanagement() {
        try {
            const response = await Users.find({ isAdmin: false }).exec()
            if (response) {
                 const totalUsers = await Users.countDocuments({isAdmin:false});
                const userDetail = {totalUsers,response}
                return userDetail
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }

    async allUserPost() {
        try {
            const allUserPost = await Posts.find()
            if (allUserPost) {
                return allUserPost
            }   
            return null
        } catch (error) {
            console.log(error);
        }
    }

    async UserBlocked(userEmail: any, isBlock: any) {
        try {
            console.log(userEmail,isBlock);
            const UserDetais = await Users.findOneAndUpdate({ email: userEmail }, {
                $set: {
                    isBlocked: isBlock
                }
            })
            if (UserDetais) {
                return UserDetais
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }

    async adminDetails(email: string) {
        try {
            const adminData = await Users.findOne({ email: email })
            if (adminData) {
                return adminData
            }
            return null
        } catch (error) {
            console.log(error)
        }
    }

    async UserDetails(user: userObj) {
        try {
            const UserDetails = await Users.findOneAndUpdate({ _id: user.email }, {
                $set: {
                    email: user.email,
                    username: user.username,
                    fullName: user.fullName,
                    image: user.image,
                    DOB: user.DOB,
                    bio: user.bio,
                    password: user.password,
                    isAdmin: user.isAdmin,
                    Gender: user.Gender,
                    isBloced: user.isBlocked
                }
            })

            if (UserDetails) {
                return UserDetails
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }
}