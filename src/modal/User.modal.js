import mongoose, { Schema, Types } from "mongoose";
import Jwt from "jsonwebtoken";
import bcrupt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      index: true, // for searching purpose for omtimize
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, /// cloudinary // url
      required: true,
    },

    coverimage: {
      type: String, /// cloudinary
    },
    watachHistory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "passward is required"],
    },

    refreshToken: {
      type: String, // for detail discuse
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  /// userSchema.pre use to encrupt the pw it is a middleware
  if (!this.isModified("password")) return next(); /// it check the when the pw change or update then it will change and bcrupt the pw

  this.password = await bcrupt.hash(this.password, 10); //
  next();
});

userSchema.methods.isPasswordCorrect = async function (passward) {
  /// we can make the custom method by using .methods
  return await bcrupt.compare(passward, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return Jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname, //this.fullname is came from database
    },
    // process.env.SECRET_KEY, // it is a secret key for token
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
};
userSchema.methods.generateRefreshToken = async function () {
  return Jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname, //this.fullname is came from database
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const User = mongoose.model("User", userSchema);
