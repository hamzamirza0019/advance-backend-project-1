import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("Database Connected")
    } catch (error) {
        console.error("DB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;