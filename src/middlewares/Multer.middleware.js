import multer from "multer";

/// diskstorage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // pulbic/temp where he save the images
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname); // we can change the file.originalname  as if the user save the file by same name which we already have
  },
});

export const upload = multer({ storage });
