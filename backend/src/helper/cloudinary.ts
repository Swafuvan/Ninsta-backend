import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
import { ImageData } from '../interfaces/Users';
dotenv.config()

interface profileImage{
    filepath?: string,
    base64:any
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

export const profileUpload = async (imageData: profileImage, folder: string): Promise<any> => {
    try {
        const { filepath,base64 } = imageData;
        console.log(base64[0],'popopopopopopo')
        if (imageData.filepath) {
            // If filepath is provided, upload via filepath
            return await cloudinary.uploader.upload(imageData.filepath, {
                resource_type: 'auto',
                folder
            });
        } else if (imageData.base64) {
            // Upload base64 image
            return await cloudinary.uploader.upload(base64[0], {
                resource_type: 'auto',
                folder,
            });
        } else {
            throw new Error('No valid image data provided');
        }
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
    }
}


export const uploadImages = async (imagePaths: ImageData[], folder: string): Promise<any[]> => {
    console.log(imagePaths,);
    const uploadPromises = await Promise.all( imagePaths.map( async (path) => (await uploadImage(path, folder))?.secure_url));
    try {
        return await Promise.all(uploadPromises);
    } catch (error) {
        console.error('Error uploading images to Cloudinary:', error);
        throw error;
    }
};
