


import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        if (!filePath || !fs.existsSync(filePath)) {
            console.log("File not found:", filePath);
            return null;
        }

        const uploadResult = await cloudinary.uploader.upload(filePath);

        // Agar file exist hai tabhi delete karo
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return uploadResult.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);

        // Error ke baad bhi safe delete
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return null;
    }
};

export default uploadOnCloudinary;

