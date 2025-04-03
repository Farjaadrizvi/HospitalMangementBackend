import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const DB_NameConnection = async () => {
  try {
    let connectionDb = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      "Attempting to connect to MongoDB at:",
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log("Connected to MongoDB", `${connectionDb.connection.host}`);
  } catch (error) {
    console.log("mangoose connection not working ", error);
    process.exit(1); // for learning
  }
};

export default DB_NameConnection;
