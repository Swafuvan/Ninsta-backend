import { getPayload } from "../../helper/JWT";
import { PostRepositoryInterface } from "../../interfaces/Posts/postRepository";
import { userObj } from "../../interfaces/Users";
import { Comment } from "../../model/commentModel";
import { Notification } from "../../model/notificationModel";
import { Posts } from "../../model/postModel";
import { PostReports } from "../../model/postReport";
import { SavePost } from "../../model/savePostModel";
import { Users } from "../../model/userModel";


export class PostRepository implements PostRepositoryInterface {
    async allComments(postId: string) {
        try {
            const commentDetail = await Comment.find({ postId: postId + '' }).populate('postId').populate('userId')
            if (commentDetail) {
                return commentDetail
            }
            return null
        } catch (error) {
            console.log(error)
        }
    }

    async ExplorePage(){
        try {
            const AllPostDetails = await Posts.find();
            if (AllPostDetails) {
                return AllPostDetails
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    async UploadPostDetails(posts: any, postContent: any, user: any) {
        console.log(posts)
        const UploadedDetails = await Posts.insertMany([{
            userId: user,
            content: postContent,
            createdAt: new Date(),
            likes: [],
            visibile: false,
            Url:posts
        }])
        if (UploadedDetails) {
            return UploadedDetails
        }
        return null
    }

    async allPostReports() {
        try {
            const allPostReports = await PostReports.find({ solve: false })
            if (allPostReports) {
                return allPostReports
            }
            return null
        } catch (error) {
            console.log(error)
        }
    }

    async AllPostDetails() {
        try {
            const allPostDetails = await Posts.find({ visibile: false }).sort({ createdAt: -1 })
            if (allPostDetails) {
                return allPostDetails
            }
            return null
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async commentNotification(userId:any,PostDetails:any,comment:any){
        try {
            const commentData = await Notification.findOne({userId:PostDetails.userId+'',postId:PostDetails._id+'',senderId:userId+'',type:'comment'});
            if(commentData){
                console.log('already there')
            }else{
                const commentNotify = Notification.create({
                    userId:PostDetails.userId,
                    postId: PostDetails._id,
                    type: 'comment',
                    content: 'Commented on this Post',
                    senderId: userId,
                }) 
                return commentNotify
            }
        } catch (error) {
            console.log(error);
        }
    }

    async Comments(commentData: any) {
        try {
            const { userId, comment, PostDetails } = commentData
            
            const Comments = await Comment.create({
                userId: userId,
                postId: PostDetails._id,
                comment: comment,
            })
            if (Comments) {
                const commentNotity = await this.commentNotification(userId,PostDetails,comment);
                return Comments
            }
            return null;
        } catch (error) {
            console.log(error)
        }
    }

    async ReportedPosts(reason: string, postdata: any) {
        try {
            const { postId, userId } = postdata
            const reportedPosts = await PostReports.create({
                postId: postId,
                reason: reason,
                reportedBy: userId,

            })
            if (reportedPosts) {
                return reportedPosts
            }
            return null
        } catch (error) {
            console.log(error)
        }
    }

    async savePosts(postData: any) {
        try {
            const { postDetails, User } = postData
            const Saveposts = await SavePost.create({
                postId: postDetails._id,
                savedBy: User,
            })
            if (Saveposts) {
                return Saveposts
            }
            return null
        } catch (error) {
            console.log(error)
        }
    }

    async AllUserPost(userid: string) {
        try {
            console.log(userid)
            const userAllPost = await Posts.find({ userId: userid, visibile: false }).populate('userId')
            if (userAllPost) {
                return userAllPost
            }
            return null
        } catch (error) {
            console.log(error)
        }
    }

    async UsersLikePosts(userId:string,postId:string,post:any){
        try {
            console.log(userId,postId,post);
            const likeNotifi = await Notification.findOne({userId:post.userId,postId:postId,senderId:userId,type:'like'});
            if(likeNotifi){
                console.log('already there')
            }else{
                const LikedNotification = await Notification.create({
                    type: 'like',
                    userId: post.userId, // who will get the notification
                    postId: postId,
                    content:'Liked Your Post',
                    senderId:userId, // who is like the Post
                })
                if (LikedNotification) {
                    return LikedNotification 
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async PostLikes(userId: any, _id: any) {
        try {
            
            const post = await Posts.findById(_id);
            if (!post) {
                console.log("Post not found");
                return;
            } else {
                const isLiked = post.likes.includes(userId);
                if (isLiked) {
                    post.likes = post.likes.filter(item => item !== userId)
                } else {
                    post.likes.push(userId)
                }
                await post.save();
                const userLikesNotify = await this.UsersLikePosts(userId,_id,post);
                console.log(userLikesNotify);
                return post;
            }


        } catch (error) {
            console.log(error)
        }
    }

    async CommentLike(comment:any,userId:string){
        try {
            // console.log(comment,userId)
            const LikedComment = await Comment.findById(comment._id)
            if(!LikedComment){
                console.log('No Comment In this ID');
                return
            }
            const isLiked = LikedComment.likes.includes(userId);
            if(isLiked){
                LikedComment.likes = LikedComment.likes.filter(id => id.toString()!== userId);
            }else{
                LikedComment.likes.push(userId.toString());
            }
            await LikedComment.save();
            return LikedComment
        } catch (error) {
            console.log(error)
        }
    }

    async CommentReplies(data:any,userId:string,reply:string){
        try {
            console.log(data,userId,reply)
            const commentRes = await Comment.findById(data);
            if(commentRes){
                commentRes.replies.push({ userId, reply })
                await commentRes.save();
                return commentRes
            } 
        } catch (error) {
            console.log(error)
        }
    }

    async getUser(userEmail: string) {
        try {
            const userDetails = await Users.findOne({ email: userEmail })
            // console.log(userDetails);
            if (userDetails) {
                return userDetails
            }
            return null
        } catch (error) {
            console.log(error);
            return null

        }
    }
}