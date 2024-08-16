import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    userId: { type: String, ref: 'User', required: true },
    type: { type: String, enum: ['user', 'post', 'like', 'comment', 'follow'], required: true },
    content: { type: String, required: true },
    senderId: { type: String, ref: 'User', required: true },
    postId: { type: String, ref: 'Post' },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
},{
    timestamps: true,
    toJSON: { virtuals: true }
});

export const Notification = mongoose.model('Notification', NotificationSchema);
