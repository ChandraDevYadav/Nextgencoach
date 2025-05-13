import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const allowedImageFormats = ["jpg", "jpeg", "png", "gif"];
const allowedVideoFormats = ["mp4", "mov", "avi", "webm", "mkv"];

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: async (req, file) => {
    const ext = file.originalname.split(".").pop().toLowerCase();
    const isImage = allowedImageFormats.includes(ext);
    const isVideo = allowedVideoFormats.includes(ext);

    return {
      folder: "nextgen-coach",
      resource_type: isVideo ? "video" : "image",
      format: isImage || isVideo ? ext : "jpg",
      public_id: `${uuidv4()}-${Date.now()}`,
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "video/mp4",
    "video/quicktime",
    "video/x-msvideo",
    "video/webm",
    "video/x-matroska",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

export default upload;
