import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// const upload = multer() // for parsing multipart/form-data for uploading data file

const app = express();

app.use(
  // use for setting the middle ware
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // allow session cookies
  })
);

app.use(
  express.json({
    // for limit how much json are allowed in db
    limit: "50mb",
  })
);

app.use(express.urlencoded({ extended: true, limit: "50mb" })); // we can adjust the limit

app.use(express.static("public")); /// anyone can acess images public is folder name

app.use(cookieParser()); // for cookie seurely pass and perform crud operation

// app.get("/", (req, res, next) => {
//   if (res.ok) {
//     res.send(() => {
//       return res.json({ message: "Welcome to the server" });
//     });
//   } else if (req.ok) {
//     req.send("request has been success");
//   } else if (!res.ok && req.ok) {
//     next("request has been failed");
//   }
// });

// app.get("/", (req, res){
//   res.send("Hello World!");
// })
//////////////////////////

import router from "./routes/User.routes.js"; /// if we export default so we can call by any name

///////////////////////

//router decelaration
app.use("/api/v1/user", router);

// app.use("/api/v1/", function aysnc(req, res, next) {
//   res.send("Hello World!");
// });

export default app;
