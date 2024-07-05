import mongoose from 'mongoose';

export const ConnectDB = async () => {
    try {
    const connection = mongoose.connect('mongodb://127.0.0.1:27017/SocialMedia');
        console.log('MongoDB Connected');
    } catch (error) {
        console.log("Connection failed "+error);
        process.exit(1);
    }  
}  