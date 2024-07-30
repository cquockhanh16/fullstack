const express = require("express");
const router = express.Router();

const shopControllers = require("../controller/shopController");

router.get("/products", shopControllers.getAllProducts);

router.get("/categories/:category_name", shopControllers.getProductByCateName);

router.get("/detail/:cate_id/:p_id", shopControllers.getDetailProduct);

router.get("/categories", shopControllers.getAccessories);

router.get("/search/:key", shopControllers.search);

module.exports = router;
