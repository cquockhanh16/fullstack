const jwt = require("jsonwebtoken");
const HttpError = require("../models/HttpError");
const dotenv = require("dotenv");

dotenv.config();

const { SERCET_KEY_TOKEN } = process.env;

// middleware để kiểm tra người dùng đã đăng nhập vào hệ thống hay chưa
const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    next(
      new HttpError(
        "Bạn cần đăng nhập để thực hiện các chức năng của trang web",
        401
      )
    );
  }
  jwt.verify(token, SERCET_KEY_TOKEN, (err, user) => {
    // nếu có lỗi thì thông báo ra lỗi
    if (err) {
      next(new HttpError("Không đủ thẩm quyền", 403));
    }
    // nếu đã đăng nhập thì sẽ chạy các route tiếp theo và gửi kèm theo req một user.
    req.user = user;
    next();
  });
};

module.exports = auth;
