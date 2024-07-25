import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()

interface ImageData {
    filepath: string;
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



export const uploadImage = async (imageData: ImageData, folder: string): Promise<any> => {
    const { filepath } = imageData;
    console.log(filepath)
    try {
        return await cloudinary.uploader.upload(filepath, {
            resource_type: "auto",
            folder
        });
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
    }
}

export const uploadImages = async (imagePaths: ImageData[], folder: string): Promise<any[]> => {
    // console.log(imagePaths);
    const uploadPromises = imagePaths.map( async (path) => (await uploadImage(path, folder))?.secure_url);
    try {
        return await Promise.all(uploadPromises);
    } catch (error) {
        console.error('Error uploading images to Cloudinary:', error);
        throw error;
    }
};
