import mongoose from "mongoose";

const PostReportSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reason: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 500,
        required: true
    },
    solve:{
        type: Boolean,
        default: false
    }
    
}, {
    timestamps: true
});

export const PostReports = mongoose.model('PostReport', PostReportSchema);
