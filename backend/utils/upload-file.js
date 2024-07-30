const multer = require("multer");
const path = require("path");

// Cấu hình multer để lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Đặt tên file để tránh trùng lặp
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
