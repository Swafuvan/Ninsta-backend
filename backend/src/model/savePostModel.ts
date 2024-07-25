import mongoose from "mongoose";

// Schema for SavedPosts
const SavePostsSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
        index: true
    },
    savedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    collectionName: {
        type: String,
        default: 'default',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export const SavePost = mongoose.model('SavePost', SavePostsSchema);
