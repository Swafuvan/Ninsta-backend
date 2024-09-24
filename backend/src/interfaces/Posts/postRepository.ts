export interface PostRepositoryInterface{
    UploadPostDetails(posts:any,postContent:any,user:any):Promise<any>
    getUser(email:string):Promise<any>
    AllPostDetails():Promise<any>
    PostLikes(userId:any,_id:any):Promise<any>
    Comments(datas:any):Promise<any>
    AllUserPost(userid:string):Promise<any>
    ReportedPosts(reason:string,postId:any):Promise<any>
    allComments(postId:string):Promise<any>
    allPostReports():Promise<any>
    savePosts(postData:any):Promise<any>
    CommentLike(comment:any,userId:string):Promise<any>
    CommentReplies(data:any,userId:string,reply:string):Promise<any>
    ExplorePage():Promise<any>
    UploadVideos(data:any,text:string,user:string):Promise<any>
    DeleteUserPost(post:any):Promise<any>
    EditPostDetails(postId:any,content:string):Promise<any>
    
}