import { v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv";
import multer from 'multer';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export const upload = multer({storage: multer.memoryStorage()});

export const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: 'aamchi-mumbai' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        ).end(buffer);
    });
};