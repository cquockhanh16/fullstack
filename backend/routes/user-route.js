const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const userControllers = require("../controller/userController");
const upload = require("../utils/upload-file");

// đăng ký tài khoản
router.post("/resgister", upload.single("file"), userControllers.resgister);

// đăng nhập
router.post("/login", userControllers.login);

// mua hàng
router.post("/order", auth, userControllers.order);

// lấy thông tin đơn hàng theo id
router.get("/get-order/:order_id", auth, userControllers.getOrder);

// lấy danh sách đơn hàng
router.get("/orders", auth, userControllers.getAllOrders);

// lấy thông tin tài khoản
router.get("/infor", auth, userControllers.getInformation);

// hủy đơn hàng
router.patch("/order", auth, userControllers.cancelOrderById);

//
router.get("/avatar", auth, userControllers.getAnAvatar);

router.post("/payment", userControllers.payment);

router.post("/callback", userControllers.callback);

module.exports = router;
