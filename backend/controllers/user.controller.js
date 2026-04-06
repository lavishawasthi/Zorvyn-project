import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { createLog } from "./audit.controller.js";

const generateAccessAndRefreshToken = async(userId)=>{
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}

    }catch(err){
        throw new ApiError(500,"something went wrong while generating refresh and accesstoken")
    }
}


const registerUser = asyncHandler( async (req,res)=>{

    const {fullname,email,username,password}=req.body

    if(
        [fullname,email,username,password].some((field)=>
            field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }

   

    const existedUser= await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }

    const user =await User.create(
        {
            fullname,
            password,
            email,
            username:username.toLowerCase(),
            role:"Viewer"
        }
    )
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(201,createdUser,"user registered sucessfully")
    )
})

const loginUser = asyncHandler (async (req,res)=>{

    const {email,password,username}=req.body

    if(!username || !email){
        throw new ApiError(400,"username or password is required")
    }

    const user=await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(404,"User not found!!")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    
    if(!isPasswordValid){
        throw new ApiError(401,"invalid password!!")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options= {
        httpOnly: true,
        secure: true
    }
    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,accessToken,refreshToken
            },
            "User logged in sucessfully"
        )
    )
})

const logoutUser = asyncHandler(async (req,res)=>{

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )

    const options= {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("accessToken",options)
    .json(
        new ApiResponse(200,{},"user logged out")
    )

})


//for admin only 

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");
    return res.status(200).json(new ApiResponse(200, users, "Users fetched"));
});

const updateUserRole = asyncHandler(async (req, res) => {
    const { userId, newRole } = req.body;

    if (!["Admin", "Analyst", "Viewer"].includes(newRole)) {
        throw new ApiError(400, "Invalid role");
    }

    const user = await User.findByIdAndUpdate(
        userId,
        { $set: { role: newRole } },
        { new: true }
    ).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    await createLog(
        req.user._id,
        "ROLE_UPDATE",
        `Changed role of ${user.username} to ${newRole}`,
        req.ip
    );

    return res.status(200).json(new ApiResponse(200, user, "Role updated"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user, "Current user fetched"));
});

export {
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers,
    updateUserRole,
    getCurrentUser
}