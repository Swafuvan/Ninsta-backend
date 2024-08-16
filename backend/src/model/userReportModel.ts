import mongoose from "mongoose";

const UserReportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reportedBy: {
        type: String,
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

export const UserReports = mongoose.model('userReport', UserReportSchema);
