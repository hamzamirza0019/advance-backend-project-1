import dotenv from "dotenv";
dotenv.config({
  path: './.env'
});
import app from "./app.js";
import connectDB from "./db/index.js";
import { DB_NAME } from "./constants.js";



const PORT = process.env.PORT || 5000;
 connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

 





/*
import express from 'express';
const app = express();


( async () => {

    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
        app.on("error", () => {
            console.error("Error", error);
            throw error;
        })


        app.listen(process.env.PORT, ()=>{
            console.log(`App listen at port ${process.env.PORT}`);
        })
    }catch(error){
        console.error("ERROR", error);
        throw error;
    }
} )()

*/
