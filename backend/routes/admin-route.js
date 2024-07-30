const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const adminControllers = require("../controller/adminController");
const upload = require("../utils/upload-file");

// lấy danh sách sản phẩm
router.get("/products", auth, adminControllers.getAllProducts);

// lấy danh sách khuyến mãi
router.get("/promotions", auth, adminControllers.getAllPromotions);

router.patch("/promotions", auth, adminControllers.editPromotionById);

// lây danh sách danh mục
router.get("/categories", auth, adminControllers.getAllCategories);

// thêm danh mục mới
router.post("/categories", auth, adminControllers.createCategorie);

// lây danh sách tài khoản
router.get("/accounts", auth, adminControllers.getAllAccounts);

router.patch("/accounts", auth, adminControllers.lockAccountById);

router.get("/suppliers", auth, adminControllers.getAllSuppliers);

router.post("/suppliers", auth, adminControllers.createSupplier);

router.patch("/suppliers", auth, adminControllers.editSupplierById);

router.get("/product/:id", auth, adminControllers.getProductById);

router.post(
  "/product",
  auth,
  upload.single("file"),
  adminControllers.createProduct
);

router.patch(
  "/products",
  auth,
  upload.single("file"),
  adminControllers.editProductById
);

router.patch("/orders", auth, adminControllers.editOrderById);

router.get("/orders", auth, adminControllers.getOrders);

router.get("/order", auth, adminControllers.getAnOrder);

router.delete("/products", auth, adminControllers.deleteProductById);

module.exports = router;
