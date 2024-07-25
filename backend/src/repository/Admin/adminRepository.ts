import { adminRepositoryInterface } from "../../interfaces/admin/adminRepository";
import { Loginuser, userObj } from "../../interfaces/Users";
import { Posts } from "../../model/postModel";
import { PostReports } from "../../model/postReport";
import { Users } from "../../model/userModel";

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
            const response = await Users.find({ isAdmin: false })
            if (response) {
                return response
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }

    async UserBlocked(userEmail: any, isBlock: any) {
        try {
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