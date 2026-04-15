import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.api.ping()
  .then(res => console.log("Cloudinary OK:", res))
  .catch(err => console.error("Cloudinary FAIL:", err));