import { getPayload } from "../../helper/JWT";
import { PostRepositoryInterface } from "../../interfaces/Posts/postRepository";
import { userObj } from "../../interfaces/Users";
import { Comment } from "../../model/commentModel";
import { Posts } from "../../model/postModel";
import { PostReports } from "../../model/postReport";
import { SavePost } from "../../model/savePostModel";
import { Users } from "../../model/userModel";


export class PostRepository implements PostRepositoryInterface {
    async allComments(postId: string) {
        try {
            const commentDetail = await Comment.find({ postId: postId + '' }).populate('postId').populate('userId')
            if (commentDetail) {
                console.log(commentDetail)
                return commentDetail
            }
            return null
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
            comments: [],
            visibile: false,
            Url: posts
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
            console.log(allPostDetails);
            if (allPostDetails) {
                return allPostDetails
            }
            return null
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async Comments(commentData: any) {
        try {
            const { userId, comment, PostDetails } = commentData
            console.log(userId, comment, PostDetails)
            console.log(PostDetails._id, '-----------------------')
            const Comments = await Comment.create({
                userId: userId,
                postId: PostDetails._id,
                comment: comment,

            })
            console.log(Comments)
            console.log('vannutta')
            if (Comment) {
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
            console.log(postId, userId, 'last ethi')
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
            const { postDetails, userData } = postData
            const Saveposts = await SavePost.create({
                postId: postDetails._id,
                savedBy: userData,
                postData: [postDetails]
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
            const userAllPost = await Posts.find({ userId: userid, visibile: false })
            console.log(userAllPost)
            if (userAllPost) {
                return userAllPost
            }
            return null
        } catch (error) {
            console.log(error)
        }
    }

    async PostLikes(userId: any, _id: any) {
        try {
            // const PostDatails = await Posts.findByIdAndUpdate(_id,{
            //     $push: { likes: userId }
            // })
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
                return post;
            }

            // console.log(post.likes, userId, "this is rhe calling")
            // post.likes = post.likes.map(i => i + "")
            // const isLiked = post.likes.includes(userId);
            // if (isLiked) {
            //     // User has already liked the post, so remove the like
            //     // post.likes = post.likes.filter(id => id.toString() !== userId);
            // } else {
            //     // User has not liked the post, so add the like
            //     post.likes.push(userId.toString());
            // }

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