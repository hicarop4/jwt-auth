import multer from "multer";
import path from "path";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import crpyto from "crypto";

// AWS S3 settings
const configS3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
});

// multer storage local preferences
const storageLocal = multer.diskStorage({
  destination: path.resolve(__dirname, "..", "uploads"),
  filename: (request, file, callback) => {
    const date = Date.now().toString();
    const random = crpyto.randomBytes(8).toString("hex");
    const fileName = `${date}-${random}-${file.originalname}`;

    callback(null, fileName);
  },
});

// multer storage s3 preferences
const storageS3 = multerS3({
  s3: configS3,
  bucket: "my-jwt-auth",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read",
  key: (request, file, callback) => {
    const date = Date.now().toString();
    const random = crpyto.randomBytes(8).toString("hex");
    const fileName = `${date}-${random}-${file.originalname}`;
    callback(null, fileName);
  },
});

// function to filter images
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png", "image/gif"];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// multer settings
const config = {
  storage: storageS3, // change to storageLocal to save in local storage
  fileFilter,
  limits: { fileSize: 1024 * 1024 },
};
export default config;
