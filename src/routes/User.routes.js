import { Router } from "express";
import { registerUser } from "../controller/User.controller.js";
import { upload } from "../middlewares/Multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 5,
    },
  ]),

  registerUser
);

export default router;
