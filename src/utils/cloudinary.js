import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import "dotenv/config";
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadtoCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const resposne = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File Uploaded on cloudinary. File src:" + resposne.url);
    //once file upload we can delete it from local storage
    fs.unlinkSync(localFilePath);
    return resposne;
  } catch (error) {
    console.log("cloudinary error", error);
    fs.unlinkSync(localFilePath);

    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    return null;
  }
};

export { uploadtoCloudinary, deleteFromCloudinary };
