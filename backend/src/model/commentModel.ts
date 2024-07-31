import mongoose, { Document } from "mongoose";

const ReplySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    createdAt: {
        type: Date,
        default:new Date()
    },
    reply: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 500
    }
}, {
    timestamps: true
});

const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    comment: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 500
    },
    replies: {
        type: [ReplySchema],
        default: []
    },
    likes: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

export const Comment = mongoose.model('Comment', CommentSchema);

