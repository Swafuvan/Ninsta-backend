
import mongoose from 'mongoose';
import { Loginuser, OTPData, forgotPassword, googleUser, userObj } from '../../interfaces/Users'
import { userRepositoryInterface } from "../../interfaces/users/userRepository";
import { Users } from "../../model/userModel";
import { Message } from '../../model/messageModel';
import { SavePost } from '../../model/savePostModel';

export class userRepository implements userRepositoryInterface {
    async userFindById(userid: string) {
        try {
            const userDetails = await Users.findById(userid)
            if (userDetails) {
                return userDetails
            }
            return null
        } catch (error) {
            console.log(error)
        }
    }

    async loginUser(datas: Loginuser): Promise<userObj | null> {
        try {
            console.log(datas.email, datas.password);

            const userDetails = await Users.findOne({ email: datas.email })
            return userDetails as userObj;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async userSearch(search: string) {
        try {
            const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            const searchResult = await Users.find({isAdmin:{$ne:true},
                username: { $regex: escapedSearch, $options: 'i' }
            });
            if (searchResult) {
                return searchResult
            }
            return null
        } catch (error) {
            console.log(error)
        }
    }

    async FollowUser(userId:string, friendId:any){
        try {
            const followerData = await Users.findById(userId);
            const followingData = await Users.findById(friendId._id);
            if(followerData){
                const friend = followerData.following.includes(friendId?._id);
                if(friend){
                    followerData.following = followerData.following.filter(val => val !== friendId._id);
                }else{
                    followerData.following.push(friendId._id);
                }
                await followerData.save();
                if(followingData){
                    const friend = followingData.followers.includes(userId);
                    if(friend){
                        followingData.followers = followingData.followers.filter(val => val !== userId);
                    }else{
                        followingData.followers.push(userId);
                    }
                    await followingData.save();
                    
                }
                return {followerData,followingData}
            }
        } catch (error) {
            console.log(error);
        }
    }

    async UserChats(message: any) {
        try {
            const userChat = await Message.create({
                from: message.from,
                to: message.to,
                message: message.message,
                seen: message.seen,
                File: {
                    fileType: message.File.fileType,
                    Link: message.File.Link
                },
                time: message.time
            })
            console.log(userChat)
            if (userChat) {
                return userChat
            }
        } catch (error) {
            console.log(error);
        }
    }

    async AllUserDetails(userId: string) {
        try {
            const userData = await Users.find({ _id: { $ne: userId }, isAdmin: false });
            if (userData) {
                return userData
            }
            return null
        } catch (error) {
            console.log(error)
        }
    }

    async signupUser(user: userObj): Promise<userObj | null> {
        try {
            const createdUser = await Users.create({
                fullName: "user",
                email: user.email,
                username: user.username,
                password: user.password,
                isAdmin: false,
                image: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
                bio: "Hi Guys i am started Ninsta",
                DOB: "",
                Gender: "Default",
                isBlocked: false,
                following: [],
                followers: []

            })
            return createdUser as userObj
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async getUser(userEmail: String): Promise<userObj | null> {
        try {
            const userDetails = await Users.findOne({ email: userEmail })
            if (userDetails) {
                return userDetails as userObj
            }
            return null
        } catch (error) {
            console.log(error);
            return null

        }
    }

    async forgotPassword(userDetail: forgotPassword) {
        try {
            const { email, password } = userDetail
            const ChangedPassword = await Users.findOneAndUpdate({ email: email }, {
                $set: {
                    password: password,
                }
            })
            if (ChangedPassword) {
                return ChangedPassword
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }

    async googleSignup(userData: googleUser) {
        try {
            console.log(userData);
            const createdUser = await Users.insertMany({
                fullName: userData.fullName,
                email: userData.email,
                username: userData.username,
                password: userData.password,
                isAdmin: false,
                image: userData.image,
                bio: "Hi Guys i am started Ninsta",
                DOB: "",
                Gender: "Default",
                isBlocked: false,
                following: [],
                followers: []
            })
            if (createdUser) {
                return createdUser
            }
            return null
        } catch (error) {
            console.log(error);

        }
    }

    async OTPAddDatabase(email: string, otp: string): Promise<boolean> {
        const results = await Users.findOneAndUpdate({ email: email }, { $set: { OTP: otp } })
        if (results) {
            return true
        }
        return false
    }

    async friendSuggession(userId:string){
        try {
            const userSuggession = await Users.find({_id:{$ne:userId},isBlocked:false,isAdmin:false}).sort({_id:-1})
            console.log(userSuggession);
            if(userSuggession){
                return userSuggession
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }

    async UserMessages(userid: string, senderId: string) {
        try {
            console.log('user :' + userid, 'sender :' + senderId,);
            const ChatDetails = await Message.find({
                $or: [
                    { from: userid, to: senderId },
                    { from: senderId, to: userid }
                ]
            }).sort({ time: 1 });
            console.log(ChatDetails)
            if (ChatDetails) {
                return ChatDetails
            }
            return null
        } catch (error) {
            console.log(error)
        }
    }

    async SavedPosts(userId: string) {
        try {
            const SavedPost = await SavePost.find({ savedBy: userId }).populate('postId');
            if (SavedPost) {
                console.log(SavedPost)
                return SavedPost
            }
        } catch (error) {
            console.log(error);
        }
    }

    async OTPChecking(OtpDetails: OTPData): Promise<userObj | null> {
        try {
            const { email, otp } = OtpDetails
            console.log(email, otp)
            const checkingOTP = await Users.findOne({ email: email })
            if (checkingOTP) {
                if (checkingOTP?.OTP === otp.toString()) {
                    return checkingOTP as userObj;
                }
            }
            return null
        } catch (error) {
            console.log(error);
            throw error
        }
    }

}