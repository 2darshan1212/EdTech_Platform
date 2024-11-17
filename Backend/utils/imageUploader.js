import { v2 as cloudinary } from "cloudinary";

//function to upload image to cloudinary
export const uploadImage = async (file, folder, height, quality) => {
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  //upload the image to cloudinary and return the response
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
