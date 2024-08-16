
export interface PostRepositoryInterface{
    UploadPostDetails(posts:any,postContent:any,user:any)
    getUser(email:string)
    AllPostDetails()
    PostLikes(userId:any,_id:any)
    Comments(datas:any)
    AllUserPost(userid:string)
    ReportedPosts(reason:string,postId:any)
    allComments(postId:string);
    allPostReports();
    savePosts(postData:any);
    CommentLike(comment:any,userId:string);
    CommentReplies(data:any,userId:string,reply:string);
    ExplorePage();
    
}