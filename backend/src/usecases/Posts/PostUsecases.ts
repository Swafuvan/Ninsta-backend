import { uploadImages } from "../../helper/cloudinary";
import { PostRepositoryInterface } from "../../interfaces/Posts/postRepository";
import { PostUsecasesInterface } from "../../interfaces/Posts/PostUsecases";
import { userObj } from "../../interfaces/Users";

export class PostUsecases implements PostUsecasesInterface {
    constructor(private postRepository: PostRepositoryInterface) { }
    async allComments(postId: string) {
        try {
            const CommentData = await this.postRepository.allComments(postId)
            if (CommentData) {
                return CommentData
            }
        } catch (error) {
            console.log(error)
        }
    }

    async allPostReports() {
        try {
            const reportData = await this.postRepository.allPostReports()
            if (reportData) {
                return reportData
            }
        } catch (error) {
            console.log(error)
        }
    }

    async ExplorePage() {
        try {
            const ExploreData = await this.postRepository.ExplorePage();
            return ExploreData
        } catch (error) {
            console.log(error)
        }
    }

    async UploadPostDetails(posts: any, user: any) {

        const data = posts
        const userData = await this.getUser(user);
        const results: { url: string; fileType: string }[] = [];
        console.log(posts.files, posts.fields, '00000000000000000000000')
        for (const key in posts.fields) {
            if (key !== 'text') {
                if (posts.fields[key][0] === "image") {
                    console.log(posts.fields[key][0])
                    const imageData = {
                        files: posts.files['PostFiles[0][file]'],
                        fileType: posts.fields[key][0],
                    }
                    const imageResults = await uploadImages(imageData.files, 'posts');
                    const data = imageResults.map(item => { return { url: item, fileType: "image" } })
                    console.log(imageResults, data, 'o0o0o0o0o0o0oo00')
                    results.push(...data);

                } else {
                    const videoData = {
                        files: posts.files['PostFiles[0][file]'],
                        fileType: posts.fields[key][0],
                    }
                    const videoResults = await uploadImages(videoData.files, 'posts');
                    const data = videoResults.map(item => { return { url: item, fileType: "video" } })
                    console.log(videoResults, data, 'o0o0o0o0o0o0oo00')
                    results.push(...data);

                }
            }
        }
        return await this.postRepository.UploadPostDetails(results, posts.fields.text[0], userData._id);

        // const value = data.fields.text[0]
        // return await this.postRepository.UploadPostDetails(results, value, userData._id);
    }

    async savePosts(postData: any) {
        try {
            const savedPost = await this.postRepository.savePosts(postData);
            if (savedPost) {
                return savedPost
            }
        } catch (error) {
            console.log(error)
        }
    }

    async PostLikes(userId: any, _id: any) {
        try {
            const PostData = await this.postRepository.PostLikes(userId, _id)
            if (PostData) {
                return PostData
            }
        } catch (error) {
            console.log(error)
        }
    }

    async Comments(commentData: any) {
        try {

            const CommentData = await this.postRepository.Comments(commentData)
            if (CommentData) {
                return CommentData
            }
        } catch (error) {
            console.log(error)
        }
    }

    async ReportedPosts(reason: string, postId: any) {
        try {
            const ReportedPost = await this.postRepository.ReportedPosts(reason, postId)
            if (ReportedPost) {
                return ReportedPost
            }
        } catch (error) {
            console.log(error)
        }
    }

    async CommentReplies(data: any, userId: string, reply: string) {
        try {
            const commentReply = await this.postRepository.CommentReplies(data, userId, reply);
            if (commentReply) {
                return commentReply
            }
        } catch (error) {
            console.log(error)
        }
    }

    async CommentLike(comment: any, userId: string) {
        try {
            const CommentLike = await this.postRepository.CommentLike(comment, userId)
            if (CommentLike) {
                return CommentLike
            }
        } catch (error) {
            console.log(error)
        }
    }


    async AllUserPost(userid: string) {
        try {
            console.log("user use case")
            const UserPost = await this.postRepository.AllUserPost(userid);
            if (UserPost) {
                return UserPost
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getUser(userEmail: string) {
        try {

            return await this.postRepository.getUser(userEmail)
        } catch (error) {
            console.log(error)
        }
    }

    async AllPostDetails() {
        try {
            const postData = await this.postRepository.AllPostDetails()
            return postData
        } catch (error) {
            console.log(error)
        }
    }
}