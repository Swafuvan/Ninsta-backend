import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    comment: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 500
    }
}, {
    timestamps: true
});

const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    content: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 2000
    },
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    comments: {
        type: [CommentSchema],
        default: []
    }
}, {
    timestamps: true
});

PostSchema.index({ userId: 1 });

export const Posts = mongoose.model('Post', PostSchema);
