const multer = require("multer");
const path = require("path");
const fs = require("fs");

const imagesDir = path.join(__dirname, "..", "..", "images");
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, imagesDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeEmail = String(req.body.email || "user").replace(
      /[^a-z0-9]/gi,
      "_"
    );
    cb(null, `${safeEmail}_${Date.now()}${ext}`);
  },
});

const allowed = new Set(["image/jpeg", "image/png", "image/gif"]);
const fileFilter = (_req, file, cb) => {
  if (!allowed.has(file.mimetype)) {
    return cb(new Error("INVALID_FORMAT"));
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = { upload };
