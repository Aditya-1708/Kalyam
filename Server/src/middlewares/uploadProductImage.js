import multer from "multer";
import path from "path";
import { ensureDirectoryExists } from "../utils/fileHelper.js";

const uploadDirectory = path.join(process.cwd(), "uploads", "products");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await ensureDirectoryExists(uploadDirectory);
      cb(null, uploadDirectory);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const randomValue = Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname).toLowerCase();
    const safeName = `${timestamp}-${randomValue}${extension}`;
    cb(null, safeName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (png, jpeg, jpg, webp)"));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

const uploadProductImage = upload.single("image");

export default uploadProductImage;
