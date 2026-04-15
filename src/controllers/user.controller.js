
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import jwt from "jsonwebtoken";


export const generateAccessAndRefreshTokens = async (userId)=>{
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};


    } catch (error) {
        throw new ApiError(500, [], "Something went wrong while generating Access and Refresh tokens!");
    }
}

const registerUser = asyncHandler(async (req, res )=>{
    console.log("BODY:", req.body);
console.log("FILE:", req.file);
console.log("FILES:", req.files);


    const {fullname, email, username, password} = req.body;
    console.log("email: ", email);

    if(
        [fullname, email, username, password].some((field)=> 
            field?.trim() ==="")
    ){
        throw new ApiError(400, [], "All fields are required.")
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    
    if(existedUser){
        throw new ApiError(409, [], "User with email or username already exist");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, [], "Avarat file is required");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    let coverImage;
if (coverImageLocalPath) {
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
}

    if (!avatar ) {
        throw new ApiError(400, [], "All fields are required.");
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password,
        email,
        username: username.toLowerCase()
    })


    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, [], "Something went wrong while registering the user.");
    }

    return res.status(201).json(
        new ApiResponce(200, createdUser, "User registered successfully.")
    );


    
})

export const check = asyncHandler((req, res,)=>{
    return res.status(200).json(
        new ApiResponce(200, User, "User got")
    )
})

export const loginUser = asyncHandler( async (req, res) =>{
    const {email , username, password} = req.body; 

    if( ! (username || email)){
        throw new ApiError(400, [], "Username or Password is required!");
    };

    const user = await User.findOne({
        $or: [{username}, {email}]
    });

    if( !user ) throw new ApiError(400, [], "User doesn't exist!");

    const isPasswordValid = await user.isPasswordCorrect(password);

    if( ! isPasswordValid ) throw new ApiError(401, [] , "Invalid Password!");
    console.log("USER ID:", user?._id);

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponce(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User loggedin successfully..." 
        )
    );


})

export const logoutUser = asyncHandler(async (req, res)=>{
    await User.findByIdAndUpdate(req.user?._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true 
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponce(200, [], "User logged out successfully...")
    );

})


export const refreshAccessToken = asyncHandler( async (req, res) =>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if( !incomingRefreshToken) throw new ApiError(401,[], "unauthorized request!");

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
    
        const user = await User.findById(decodedToken?._id);
    
        if( !user ) throw new ApiError(401, [], "Invalid refresh token!");
    
        if(incomingRefreshToken !== user?.refreshToken) throw new ApiError(401, [], "Refresh token is expired or used!");
    
        const options = {
            httpOnly:true,
            secure:true
        }
    
        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);
    
    
        res
        .status(200)
        .cookie("accessToken", accessToken, options )
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponce(
                200,
                {accessToken, refreshToken},
                "Access Token Refreshed Successfully..."
            )
        );  
    } catch (error) {
        throw new ApiError(401, [], error?.message || "Invalid refresh token!");
    }

    
})

export {registerUser};