const { Op } = require("sequelize");
const Product = require("../models/Product");
const Category = require("../models/Category");
const MobileDevice = require("../models/MobileDevice");
const Laptop = require("../models/Laptop");
const Accessory = require("../models/Accessory");
const Promotion = require("../models/Promotion");
const Supplier = require("../models/Supplier");
const HttpError = require("../models/HttpError");
const shopControllers = {
  getAllProducts: async (req, res, next) => {
    try {
      const products = await Product.findAll({
        include: [{ model: Promotion, attributes: ["discount_value"] }],
      });
      return res.json({ message: "get data successfully", data: products });
    } catch (error) {
      next(error);
    }
  },
  getProductByCateName: async (req, res, next) => {
    try {
      const { category_name } = req.params;
      console.log(category_name);
      let products = [];
      if (category_name === "Cũ giá rẻ") {
        products = await Product.findAll({
          include: [
            { model: Category },
            { model: Promotion, attributes: ["discount_value"] },
          ],
          attributes: [
            "product_id",
            "categories_id",
            "product_price",
            "product_name",
            "product_image_url",
            "createdAt",
          ],
          where: { is_new: false },
        });
      } else if (category_name === "Khuyến mãi") {
        products = await Product.findAll({
          include: [
            { model: Category },
            { model: Promotion, attributes: ["discount_value"] },
          ],
          attributes: [
            "product_id",
            "categories_id",
            "product_price",
            "product_name",
            "product_image_url",
            "createdAt",
          ],
          where: {
            promotion_id: {
              [Op.ne]: null,
            },
          },
        });
      } else {
        products = await Product.findAll({
          include: [
            { model: Category, where: { categories_name: category_name } },
            { model: Promotion, attributes: ["discount_value"] },
          ],
          attributes: [
            "product_id",
            "categories_id",
            "product_price",
            "product_name",
            "product_image_url",
            "createdAt",
          ],
        });
      }
      return res.json({ message: "Lấy dữ liệu thành công", data: products });
    } catch (error) {
      next(error);
    }
  },
  getDetailProduct: async (req, res, next) => {
    try {
      let { cate_id, p_id } = req.params;
      console.log(req.params);
      let data = {};
      switch (cate_id) {
        case "1":
        case "2":
          console.log(123);
          data = await MobileDevice.findOne({
            include: [
              {
                model: Product,
                where: { product_id: +p_id },
                include: [
                  { model: Promotion },
                  { model: Category },
                  { model: Supplier },
                ],
              },
            ],
          });
          break;
        case "3":
          console.log(123412344);
          data = await Laptop.findOne({
            include: [
              {
                model: Product,
                where: { product_id: +p_id },
                include: [
                  { model: Promotion },
                  { model: Category },
                  { model: Supplier },
                ],
              },
            ],
          });
          console.log(data);
          break;
        case "4":
          console.log(1);
          data = await Accessory.findOne({
            include: [
              {
                model: Product,
                where: { product_id: +p_id },
                include: [
                  { model: Promotion },
                  { model: Category },
                  { model: Supplier },
                ],
              },
            ],
          });
          break;
        default:
          throw new HttpError("Danh mục không tồn tại", 404);
      }
      if (data === null) {
        throw new HttpError("không tìm thấy sản phẩm", 404);
      }
      return res.json({ message: "Lấy dữ liệu thành công", data: data });
    } catch (error) {
      next(error);
    }
  },
  getAccessories: async (req, res, next) => {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Promotion,
          },
        ],
        limit: 3,
        offset: 0,
        order: [["createdAt", "DESC"]],
        where: { categories_id: 4 }, // Sắp xếp theo ngày tạo, mới nhất trước
      });
      return res.json({ message: "get data successfully", data: products });
    } catch (error) {
      next(error);
    }
  },
  search: async (req, res, next) => {
    try {
      const { key } = req.params;
      const products = await Product.findAll({
        where: {
          [Op.or]: [
            {
              product_name: {
                [Op.like]: `%${key}%`,
              },
            },
          ],
        },
        include: [{ model: Promotion, attributes: ["discount_value"] }],
      });
      return res.json({ message: "get data successfully", data: products });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = shopControllers;
