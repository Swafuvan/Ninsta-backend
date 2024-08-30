
export interface PostUsecasesInterface{
    UploadPostDetails(posts:any,user:any);
    getUser(email:string)
    AllPostDetails()
    PostLikes(userId:any,_id:any)
    Comments(datas:any)
    AllUserPost(userid:string):Promise<any>;
    ReportedPosts(reason:string,postId:any);
    allComments(postId:string);
    allPostReports()
    savePosts(postData:any);
    CommentLike(comment:any,userId:string);
    CommentReplies(data:any,userId:string,reply:string);
    ExplorePage();
    UploadVideos(data:any,text:string,user:string);

}