import multer from "multer";
import path from "path";

// multer storage preferences
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "..", "uploads"),
  filename: (request, file, callback) => {
    const date = Date.now().toString();
    const fileName = `${date}-${file.originalname}`;

    callback(null, fileName);
  },
});

// function to filter only images
export const fileFilter = (
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

const config = { storage, fileFilter };
export default config;
