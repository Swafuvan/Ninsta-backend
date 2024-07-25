import mongoose from "mongoose";



const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 2000
    },
    likes: [String],
    Url:[{
        type: [String],
        trim: true,
        minlength: 1,
        maxlength: 2000
    }],
    visibile:Boolean,
    createdAt:Date,
}, {
    timestamps: true
});

PostSchema.index({ userId: 1 });

export const Posts = mongoose.model('Post', PostSchema);
