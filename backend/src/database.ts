import mongoose from 'mongoose';
import 'dotenv/config'

export const ConnectDB = async () => {
    try {
    const connection = mongoose.connect(process.env.MONGO_URI+'');
        console.log('MongoDB Connected');
    } catch (error) {
        console.log("Connection failed "+error);
        process.exit(1);
    }  
}  