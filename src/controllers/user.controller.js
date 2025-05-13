import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import {
  uploadtoCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const userRegister = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  //validation
  if (
    [fullName, email, username, password].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "All fields Required");
  }

  //   console.log(req.body);
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User Already exists withe this username");
  }
  const avatarLocalpath = req.files?.avatar?.[0]?.path;
  const coverLocalpath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalpath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  //   const avatar = await uploadtoCloudinary(avatarLocalpath);

  //   let coverImage = "";
  //   if (coverLocalpath) {
  //
  //   }
  //changing the uploading logic with error handling
  let avatar;
  try {
    avatar = await uploadtoCloudinary(avatarLocalpath);
  } catch (error) {
    console.log("Uploading error for avatar", error);
    throw new ApiError(500, "Failed to upload avatar");
  }

  let coverImage;
  try {
    coverImage = await uploadtoCloudinary(coverLocalpath);
  } catch (error) {
    console.log("Uploading error for cover Image", error);
    throw new ApiError(500, "Failed to upload cover Image");
  }

  try {
    const user = await User.create({
      fullName,
      username: username.toLowerCase(),
      email,
      password,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "something went wrong in registering a user");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
  } catch (error) {
    console.log("user Creation failed");
    if (avatar) {
      await deleteFromCloudinary(avatar.public_id);
    }
    if (coverImage) {
      await deleteFromCloudinary(coverImage.public_id);
    }
    throw new ApiError(
      500,
      "something went wrong in registering a user and images is deleted from cloud"
    );
  }
});

export { userRegister };
