// require("dotenv").config();
import dotenv from "dotenv";
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";

import express from "express";
import DB_NameConnection from "./db/index.js";
// import PORT from "../env";

dotenv.config({
  path: "./env",
});

const app = express();

DB_NameConnection()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`service is running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//     app.on("error", (error) => {
//       console.error("Error: ", error);
//       throw error;
//     });
//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });
//   } catch (e) {
//     console.error(e, "error");
//     throw e;
//   }
// })();
