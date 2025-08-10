import multer from 'multer';
import { storage } from '../utils/cloudinary.js';

const upload = multer({ storage });

export const uploadSingleImage = upload.single('image');

export default function handleMulter(req, res, next) {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError || err) {
      console.error("Multer error:", err);
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}
