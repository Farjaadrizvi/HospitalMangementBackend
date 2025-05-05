import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      type: String,
      required: [true, "video is requried to save in Database"],
    },
    thumbnail: {
      type: String,
      required: true,
    },
    tittle: {
      type: String,
      required: true,
    },
    descripation: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, /// get by cloudnairy
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true, // for view default view
    },
    videoOwner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Video = mongoose.modelNames("Video", videoSchema);
