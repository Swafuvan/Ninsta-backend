import { Loginuser, userObj, OTPData, googleUser, forgotPassword, userMessage } from "../Users"

// this interface for userRepository
export interface userRepositoryInterface {
    getUser(userEmail: String): Promise<userObj | null>
    signupUser(user: userObj): Promise<userObj | null>
    loginUser(datas: Loginuser): Promise<any | null>
    OTPAddDatabase(email: string, otp: string): Promise<boolean>
    OTPChecking(OTPData): Promise<userObj | null>
    googleSignup(userData: googleUser)
    forgotPassword(userDetail: forgotPassword)
    userFindById(userid: string)
    AllUserDetails(userid: string);
    userSearch(search: string, userId: string);
    UserChats(message: userMessage);
    UserMessages(userid: string, senderId: string);
    SavedPosts(userId: string);
    friendSuggession(userId: string);
    FollowUser(userId: string, friendId: any);
    userReporting(reason: string, userId: string, reportedId: string)
    userBlocking(userId:string,blockerId:string);
    userStories(userId:string);
    StoryAdding(story:any,userId:string,text:string);
    VideoStory(story:string,userId:string,text:string);
    ownStory(userId:string);
    allUserMessages(userId:string);
    userNotifications(userId:string);
    userProfileEdit(userData:any,userId:string,images:any);
    allReels();
    messageNotification(notification:any);
    allMessage(userId:string)

}