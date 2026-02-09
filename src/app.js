import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));

app.use(cookieParser());
 

// import routes

import userRoutes from "./routes/user.route.js";
import { registerUser } from "./controllers/user.controller.js";


// routes declaration
app.use("/api/v1/users", userRoutes);

// http://localhost:8000/users/register
// http://localhost:8000/users/login



export default app;