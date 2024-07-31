import { PostUsecasesInterface } from "../../interfaces/Posts/PostUsecases";
import { Request, Response, NextFunction } from "express";
import { Fields, Files, IncomingForm } from 'formidable'
import { getPayload } from "../../helper/JWT";


export class PostController {
    constructor(private readonly PostUsecases: PostUsecasesInterface) { }

    multipartFormSubmission(req: Request): Promise<{ files: Files; fields: Fields }> {
        return new Promise((resolve, reject) => {
            const form = new IncomingForm();
            form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve({ files, fields });
                }
            });
        });
    }

    async UploadPosts(req: Request, res: Response) {
        try {
            const postData = await this.multipartFormSubmission(req)
            const user = getPayload(req)
            // console.log(postData.files,postData.fields)
            const UploadedPost = await this.PostUsecases.UploadPostDetails(postData, user?.email);
            if (UploadedPost) {
                return res.status(200).json({ UploadedPost: UploadedPost })
            }
            res.status(203).json({ message: 'Sorry buddy' })
        } catch (error) {
            console.log(error);
        }
    }

    async SaveUserPosts(req: Request, res: Response) {
        try {
            const postData = req.body
            // console.log(postData)
            const SavePost = await this.PostUsecases.savePosts(postData)
            if (SavePost) {
                return res.status(200).json({ SavePost: SavePost })
            }
            res.status(203).json({ message: 'Failed to Save Post' })
        } catch (error) {
            console.log(error)
        }
    }

    async ReplyComments(req:Request,res:Response){
        try {
            const {data,userId,reply} = req.body;
            const CommentRes = await this.PostUsecases.CommentReplies(data,userId,reply);
            if (CommentRes) {
                return res.status(200).json({ CommentRes: CommentRes })
            }
            res.status(205).json({ message: 'Failed to Add Reply' })
        } catch (error) {
            console.log(error)
        }
    }

    async CommentLikes(req:Request,res:Response){
        try {
            const {comment,userId} = req.body
            const CommentRes = await this.PostUsecases.CommentLike(comment,userId)
            if (CommentRes) {
                return res.status(200).json({ CommentRes: CommentRes })
            }
            res.status(205).json({ message: 'Failed to Like Comment' })
        } catch (error) {
            console.log(error)
        }
    }

    async LikePosts(req: Request, res: Response) {
        try {
            const { userId, post } = req.body
            const PostLiked = await this.PostUsecases.PostLikes(userId, post._id)
            if (PostLiked) {
                return res.status(200).json({ PostLiked: PostLiked })
            }
            res.status(205).json({ message: "Post Like Not Added" })
        } catch (error) {
            console.log(error)
        }
    }

    async AllPostData(req: Request, res: Response) {
        try {
            const allPost = await this.PostUsecases.AllPostDetails()
            if (allPost) {
                return res.status(200).json({ allPost: allPost })
            }
            res.status(205).json({ message: 'Failed to fetch Post' })
        } catch (error) {
            console.log(error)
        }
    }

    async AllPostReports(req: Request, res: Response) {
        try {
            const allReports = await this.PostUsecases.allPostReports()
            if (allReports) {
                return res.status(200).json({ allReports: allReports })
            }
            res.status(205).json({ message: 'Failed to fetch all reports' })
        } catch (error) {
            console.log(error)
        }
    }

    async PostComment(req: Request, res: Response) {
        try {
            const datas = req.body
            const CommentDetails = await this.PostUsecases.Comments(datas);
            if (CommentDetails) {
                return res.status(200).json({ CommentDetails: CommentDetails })
            }
            res.status(205).json({ message: 'Comment fecting Failed' })
        } catch (error) {
            console.log(error)
        }
    }

    async AllComment(req: Request, res: Response) {
        try {
            const postId = req.query.postId
            const Comments = await this.PostUsecases.allComments(postId + '')

            if (Comments) {
                return res.status(200).json({ Comments: Comments })
            }
            res.status(205).json({ message: 'Failed to fetch comments' })
        } catch (error) {
            console.log(error)
        }
    }

    async PostReports(req: Request, res: Response) {
        try {
            const { report, postData } = req.body;
            console.log(report, postData)
            const reportedPost = await this.PostUsecases.ReportedPosts(report, postData)
            if (reportedPost) {
                return res.status(200).json({ reportedPost: reportedPost })
            }
            res.status(205).json({ message: "Failed to Report Post" })
        } catch (error) {
            console.log(error)
        }
    }

    async AllUserPosts(req: Request, res: Response) {
        try {
            const userId = req.query.userId
            const UserPostData = await this.PostUsecases.AllUserPost(userId + '');
            if (UserPostData) {
                return res.status(200).json({ UserPostData: UserPostData })
            }
            res.status(205).json({ message: 'User Not Found' })
        } catch (error) {
            console.log(error);
        }
    }

}

