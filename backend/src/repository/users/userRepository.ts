
import mongoose from 'mongoose';
import { Loginuser, OTPData, forgotPassword, googleUser, userObj } from '../../interfaces/Users'
import { userRepositoryInterface } from "../../interfaces/users/userRepository";
import { Users } from "../../model/userModel";
import { Message } from '../../model/messageModel';
import { SavePost } from '../../model/savePostModel';
import { UserReports } from '../../model/userReportModel';
import { Story } from '../../model/storyModel';
import { Notification } from '../../model/notificationModel';
import { Posts } from '../../model/postModel';

export class userRepository implements userRepositoryInterface {
    async userFindById(userid: string) {
        try {
            const userDetails = await Users.findById(userid);
            if (userDetails) {
                return userDetails
            }
            return null
        } catch (error) {
            console.log(error)
        }
    }

    async userBlocking(userId: string, blockerId: string) {
        try {
            const BlockingResponse = await Users.findById(blockerId);
            if (BlockingResponse) {
                const Blocked = BlockingResponse.blockedUsers.includes(userId)
                if (Blocked) {
                    BlockingResponse.blockedUsers = BlockingResponse.blockedUsers.filter(val => val !== userId);
                } else {
                    BlockingResponse.blockedUsers.push(userId);
                }
                await BlockingResponse.save();
                return BlockingResponse

            }
        } catch (error) {
            console.log(error);
        }
    }

    async messageNotification(notification: any) {
        try {
            console.log(notification, 'ethittta');
            const notify = await Notification.findOne({ senderId: notification.from, userId: notification.to, type: 'message', content: notification.message });
            console.log(notify,notification.message);
            if (notify) {
                console.log('already send')
            } else {
                const NotificationResponse = await Notification.create({
                    senderId: notification.from,
                    userId: notification.to,
                    content: notification.message,
                    type: 'message'
                })
                if (NotificationResponse) {
                    console.log(NotificationResponse);
                    return NotificationResponse
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async userNotifications(userId: string) {
        try {
            const userNotific = await Notification.find({ userId: userId }).populate('userId')
                .populate('senderId').populate('postId')
                .sort({ createdAt: -1 }).limit(6);
            if (userNotific) {
                return userNotific
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }

    async userNotification(userId: string, friendId: any) {
        try {
            console.log(userId, friendId)
            const userFollow = await Notification.findOne({ userId: friendId._id, senderId: userId, type: 'follow' })
            if (userFollow) {
                console.log('already user follow')
            } else {
                const NotificationData = await Notification.create({
                    userId: friendId._id + '',
                    senderId: userId + '',
                    content: 'Followed You',
                    type: 'follow',
                })
                return NotificationData
            }
        } catch (error) {
            console.log(error);
        }
    }

    async userReporting(reason: string, userId: string, reportedId: string) {
        try {
            console.log(reason, userId + 'user', reportedId + "reporter");
            const userReport = await UserReports.create({
                userId: reportedId, // report person
                reportedBy: userId, // reported person
                reason: reason,
            })
            if (userReport) {
                return userReport
            }
        } catch (error) {
            console.log(error);
        }
    }


    async loginUser(datas: Loginuser): Promise<userObj | null> {
        try {
            console.log(datas.email, datas.password);
            const userDetails = await Users.findOne({ email: datas.email, isBlocked: false });
            if (userDetails) {
                return userDetails as userObj
            }
            return null;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async userStories(userId: string) {
        try {
            console.log(userId,'00000000');
            const userDetails = await Story.find({ user: { $ne: userId } }).populate('user');
            console.log(userDetails);
            if (userDetails) {
                return userDetails
            }
        } catch (error) {
            console.log(error);
        }
    }

    async StoryAdding(storyData:any,userId: string,content:string) {
        try {
            console.log(storyData[0],userId[0],content[0],'90909009090900')
            const addedStory = await Story.create({
                user: userId[0],
                caption: content[0],
                files: [{
                    type: storyData[0].fileType,
                    fileURL: storyData[0].url
                }]
            })
            if(addedStory){
                console.log(addedStory);
                return addedStory
            }
        } catch (error) {
            console.log(error);
        }
    }

    async VideoStory(story: string, userId: string, text: string) {
        try {
            const StoryData = await Story.create({
                user:userId,
                files:[{
                    fileURL:story,
                    type:'video'
                }],
                caption: text
            })
            if(StoryData){
                console.log(StoryData);
                return StoryData;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async userSearch(search: string, userId: string) {
        try {
            const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            const searchResult = await Users.find({
                _id: { $ne: userId },
                isAdmin: false,
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

    async allReels() {
        try {
            const allReelsRes = await Posts.find({});
            if (allReelsRes) {
                const Reels = allReelsRes.filter((data) => {
                    if (data.Url[0].fileType === 'video') {
                        return data
                    }
                })
                console.log(Reels);
                return Reels
            }
        } catch (error) {
            console.log(error);
        }
    }

    async userProfileEdit( userData: any,userId:string,userImage:any) {
        try {
            console.log( userData,userId,userImage,userData.username);
            const userRes = await Users.findByIdAndUpdate(userId,{
                $set:{
                    bio:userData.bio,
                    fullName:userData.fullName,
                    Gender:userData.Gender,
                    DOB:userData.DOB,
                    username:userData.username,
                    image:userImage
                }
            },{new:true});
            console.log(userRes)
            if(userRes){
                return userRes
            }
        } catch (error) {
            console.log(error);
        }
    }

    async FollowUser(userId: string, friendId: any) {
        try {
            const followerData = await Users.findById(userId);
            const followingData = await Users.findById(friendId._id);
            if (followerData) {
                const friend = followerData.following.includes(friendId?._id);
                if (friend) {
                    followerData.following = followerData.following.filter(val => val !== friendId._id);
                } else {
                    followerData.following.push(friendId._id);
                }
                await followerData.save();
                if (followingData) {
                    const friend = followingData.followers.includes(userId);
                    if (friend) {
                        followingData.followers = followingData.followers.filter(val => val !== userId);
                    } else {
                        followingData.followers.push(userId);
                    }
                    await followingData.save();
                    const notificationAdd = await this.userNotification(userId, friendId);
                    console.log(notificationAdd);
                }

                return { followerData, followingData }
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

    async messageSeen(message: any) {
        try {
            const userRes = await Message.find({
                from: message.to, to: message.from, seen: false
            })
            await userRes?.forEach(async (val) => {
                val.seen = true;
                await val.save()
            })
            return userRes.map((usr) => usr._id)
        } catch (error) {
            console.log(error);
        }
    }

    async ownStory(userId: string) {
        try {
            const ownstory = await Story.findOne({user:userId}).populate('user');
            if(ownstory){
                console.log(ownstory);
                return ownstory;
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
            const createdUser = await Users.create({
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

    async friendSuggession(userId: string) {
        try {
            const userSuggession = await Users.find({ _id: { $ne: userId }, isBlocked: false, isAdmin: false }).sort({ _id: -1 })
            if (userSuggession) {
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
            if (ChatDetails) {
                return ChatDetails
            }
            return null
        } catch (error) {
            console.log(error)
        }
    }

    async allUserMessages(userId: string) {
        try {
            console.log(userId)
            const userMessages = await Message.find({
                $or: [
                    { to: userId },
                    { from: userId }
                ]
            }).populate('to').populate('from').sort({ time: -1 });
            if (userMessages) {
                return userMessages
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }

    async SavedPosts(userId: string) {
        try {
            const SavedPost = await SavePost.find({ savedBy: userId }).populate('postId');
            if (SavedPost) {
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