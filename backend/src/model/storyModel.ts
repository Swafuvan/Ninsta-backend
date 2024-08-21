const mongoose = require('mongoose');

// Define the Story schema
const storySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    files: [{
        type: {
            type:String,
            required:true,
        },
        fileURL:{
            type:String,
            required:true,
        },
    }],
    caption: {
        type: String,
        maxlength: 500,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '24h',
    },
}, { 
    timeStamp: true
 });


export const Story = mongoose.model('Story', storySchema);

