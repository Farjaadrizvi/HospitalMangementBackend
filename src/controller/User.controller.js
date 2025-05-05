import { AsyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/api.error.js";
import { uploadCloudinary } from "../utils/Cloudinqry.js";
import { User } from "../modal/User.modal.js";
import { ApiResponse } from "../utils/Api.response.js";
const registerUser = AsyncHandler(async (req, res, next) => {
  /// get user data from frontend done
  // validatation of the data not empty done
  // check if user already exists : username or email done
  // check for images
  // check for avator
  // upload image to cloudinary
  // to check the avator upload  or not in cloudinary
  // create user object and save it to database
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  //    return send response

  const { fullname, username, email, password } = req.body;
  if (
    [fullname, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "ALL fields are required");
  }
  if (email.includes("@") && email.includes(".com")) {
    throw new ApiError(400, "Invalid Email");
  }
  const existingUser = await User.findOne({
    $or: [{ username }, { email }], /// to check the username or email is present in DB or not
  });
  if (existingUser) {
    throw new ApiError(409, "Username or Email already exists");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path; /// to check the avatar file is uploaded or notver
  const coverImage = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar  file is required");
  }

  const uploadAvatar = await uploadCloudinary(avatarLocalPath); // wait to upload the avator
  const uploadImage = await uploadCloudinary(coverImage);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }
  const user = await User.create({
    fullname,
    avatar: uploadAvatar.secure_url,
    coverImage: uploadImage.secure_url || "", /// to check the coverimage is uploaded or not
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUserID = await User.findByIdAndUpdate(user._id).select(
    "-password -refresh token"
  ); /// to update the role of user as user

  if (!createdUserID) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUserID, "User registered successfully"));
});

// const registerUser = AsyncHandler(async (req, res, next) => {
//   res.status(200).json({
//     status: "success",
//     message: "User registered successfully",
//   });
// });

export { registerUser };
