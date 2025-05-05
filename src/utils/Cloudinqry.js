import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // deal with fileupload and operate crud function

cloudinary.config({
  cloud_name: process.env.CLOUNDINARY_CLOUD_NAME,

  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadCloudinary = async (localfilepath) => {
  try {
    if (!localfilepath) return null;
    let response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });
    console.log("file uploaded successfully", response.url);
    return response;
  } catch {
    console.log("Error uploading to cloudinary");
    fs.unlinkSync(localfilepath); // remove the locally saved tempoary file as the upload operation got failed
    return null;
  }
};

export { uploadCloudinary };
