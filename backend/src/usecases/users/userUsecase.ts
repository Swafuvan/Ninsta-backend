
import { userRepositoryInterface } from "../../interfaces/users/userRepository";
import { userUsecaseInterface } from "../../interfaces/users/userUsecases";
import { userObj, Loginuser, OTPData, googleUser, forgotPassword, ImageData } from '../../interfaces/Users'
import { sendOtpEmail, generateOtp } from '../../helper/nodemailer'
import bcrypt from 'bcryptjs'
import { profileUpload, uploadImage, uploadImages } from "../../helper/cloudinary";



export class userUsecase implements userUsecaseInterface {
    constructor(private userRepository: userRepositoryInterface) { }


    async loginUser(datas: Loginuser): Promise<any> {
        try {
            let result = await this.userRepository.loginUser(datas);
            if (result) {
                let compared = await bcrypt.compare(datas.password, result?.password);
                if (compared) {
                    console.log('password match');
                    return result
                }
            }
            return null
        } catch (error) {
            console.log(error);

        }
    }

    async AllUserDetails(userId: string) {
        try {
            const AllUserData = await this.userRepository.AllUserDetails(userId)
            return AllUserData
        } catch (error) {
            console.log(error)
        }
    }

    async UserMessages(userid: string, senderId: string) {
        try {
            const MessageData = await this.userRepository.UserMessages(userid, senderId)
            return MessageData
        } catch (error) {
            console.log(error)
        }
    }

    async FollowUser(userId: string, friendId: any) {
        try {
            const followedUser = await this.userRepository.FollowUser(userId, friendId);
            if (followedUser) {
                return followedUser
            }
        } catch (error) {
            console.log(error);
        }
    }

    async userStories(userId: string) {
        try {
            const usersStoryData = await this.userRepository.userStories(userId);
            if (usersStoryData) {
                return usersStoryData
            }
        } catch (error) {
            console.log(error);
        }
    }

    async userNotifications(userId: string) {
        try {
            const userresponse = await this.userRepository.userNotifications(userId);
            if (userresponse) {
                return userresponse
            }
        } catch (error) {
            console.log(error);
        }
    }

    async allUserMessages(userId: string) {
        try {
            const userMessages = await this.userRepository.allUserMessages(userId);
            if (userMessages) {
                return userMessages
            }
        } catch (error) {
            console.log(error);
        }
    }

    async ownStory(userId: string) {
        try {
            const ownStoryData = await this.userRepository.ownStory(userId);
            if (ownStoryData) {
                return ownStoryData
            }
        } catch (error) {
            console.log(error);
        }
    }

    async StoryAdding(storyDetails: any) {
        try {
            const text = storyDetails.fields.text;
            const userId = storyDetails.fields.userId;
            const results: { url: string; fileType: string }[] = [];
            for (const key in storyDetails.fields) {
                if (key !== 'text') {
                    if (storyDetails.fields[key][0] === "image") {
                        console.log(storyDetails.fields[key][0])
                        const imageData = {
                            files: storyDetails.files['StoryData[0][file]'],
                            fileType: storyDetails.fields[key][0],
                        }
                        const imageResults = await uploadImages(imageData.files, 'Stories');
                        const data = imageResults.map(item => { return { url: item, fileType: "image" } })
                        results.push(...data);
                    } 
                }
            }
            const storyData = await this.userRepository.StoryAdding(results,userId,text);
            if (storyData) {
                return storyData
            }
        } catch (error) {
            console.log(error);
        }
    }

    async VideoStory(story: string, userId: string, text: string) {
        try {
            const userStory = await this.userRepository.VideoStory(story,userId,text);
            if(userStory){
                return userStory
            }
        } catch (error) {
            console.log(error);
        }
    }

    async friendSuggession(userId: string) {
        try {
            const userSugg = await this.userRepository.friendSuggession(userId);
            if (userSugg) {
                return userSugg
            }
        } catch (error) {
            console.log(error);
        }
    }

    async SavedPosts(userId: string) {
        try {
            const SavedData = await this.userRepository.SavedPosts(userId)
            return SavedData
        } catch (error) {
            console.log(error)
        }
    }

    async userBlocking(userId: string, blockerId: string) {
        try {
            const blockResponse = await this.userRepository.userBlocking(userId, blockerId);
            if (blockResponse) {
                return blockResponse
            }
        } catch (error) {
            console.log(error);
        }
    }

    async userReporting(reason: string, userId: string, reportedId: string) {
        try {
            const ReportedData = await this.userRepository.userReporting(reason, userId, reportedId);
            if (ReportedData) {
                return ReportedData
            }
        } catch (error) {
            console.log(error)
        }
    }


    async userSearch(search: string, userId: string) {
        try {
            const SearchData = await this.userRepository.userSearch(search, userId);
            if (SearchData) {
                return SearchData
            }
        } catch (error) {
            console.log(error)
        }
    }

    async OTPAddDatabase(email: string, OTP: string) {
        const DataAdd = await this.userRepository.OTPAddDatabase(email, OTP)
        return DataAdd
    }

    async userFindById(userid: string) {
        try {
            const Userdata = await this.userRepository.userFindById(userid)
            return Userdata
        } catch (error) {
            console.log(error)
        }
    }

    async signupUser(details: userObj): Promise<userObj | null> {
        try {
            console.log(details);
            details.password = await bcrypt.hash(details.password, 12)
            const CreatedUser = await this.userRepository.signupUser(details)
            if (CreatedUser) {
                console.log(CreatedUser);
                const userOTP = await generateOtp()
                console.log("Sended OTP iS:" + userOTP);
                const OTPSending = await sendOtpEmail(CreatedUser.email, userOTP)
                const OTPSaved = await this.OTPAddDatabase(CreatedUser.email, userOTP)
                if (OTPSaved) {
                    return CreatedUser;
                }
            }
            return null
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async ResendOtp(email: string) {
        try {
            console.log(email)
            const otpResended = await generateOtp()
            console.log('New OTP is:' + otpResended)
            const otpSendingEmail = await sendOtpEmail(email, otpResended)
            const otpComplete = await this.OTPAddDatabase(email, otpResended)
            if (otpComplete) {
                return otpComplete
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getUser(userEmail: String): Promise<userObj | null> {
        return await this.userRepository.getUser(userEmail)
    }

    async forgotPassword(userDetail: forgotPassword) {
        try {
            userDetail.password = await bcrypt.hash(userDetail.password, 12)
            const ChangedData = await this.userRepository.forgotPassword(userDetail)
            if (ChangedData) {
                return ChangedData
            }
            return null
        } catch (error) {
            console.log(error);
        }
    }

    async userProfileEdit(userData: any,userImage:any,userId:any) {
        try {
            // const buffer = Buffer.from(userImage, 'base64');
            const imageResults = await profileUpload({base64:userImage}, 'ProfileImage');
            const userEdited = await this.userRepository.userProfileEdit(userData,userId,imageResults.secure_url);
            if (userEdited) {
                return userEdited
            }
        } catch (error) {
            console.log(error);
        }
    }


    async allReels() {
        try {
            const reelsfind = await this.userRepository.allReels();
            if (reelsfind) {
                return reelsfind
            }
        } catch (error) {
            console.log(error);
        }
    }

    async GoogleSignup(UserData: googleUser) {
        try {
            UserData.password = await bcrypt.hash(UserData.password, 12)
            const userResult = await this.userRepository.googleSignup(UserData)
            console.log(userResult);
            return userResult
        } catch (error) {
            console.log(error);

        }
    }

    async OtpVerification(OtpDetails: OTPData): Promise<userObj | null> {
        const checkingOTP = await this.userRepository.OTPChecking(OtpDetails)
        return checkingOTP
    }

}