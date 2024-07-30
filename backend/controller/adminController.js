const Product = require("../models/Product");
const Category = require("../models/Category");
const MobileDevice = require("../models/MobileDevice");
const Laptop = require("../models/Laptop");
const Accessory = require("../models/Accessory");
const Promotion = require("../models/Promotion");
const Supplier = require("../models/Supplier");
const HttpError = require("../models/HttpError");
const sequelize = require("../utils/connectDB");
const fs = require("fs");
const path = require("path");
const Order = require("../models/Order");
const Customer = require("../models/Customer");
const OrderDetail = require("../models/OrderDetail");
const Account = require("../models/Account");
const MINE_TYPE = {
  "image/png": "image/png",
  "image/jpg": "image/jpg",
  "image/jpeg": "image/jpeg",
  "image/png": "image/png",
};
const adminControllers = {
  getAllProducts: async (req, res, next) => {
    try {
      const user = req.user;
      console.log(user);
      if (user.is_admin !== true) {
        throw new HttpError("Không đủ thẩm quản", 403);
      }
      const products = await Product.findAll({
        include: {
          model: Category,
          attributes: ["categories_name"], // chỉ lấy thuộc tính name của Category
        },
      });
      return res.json({ message: "get data successfully", data: products });
    } catch (error) {
      next(error);
    }
  },
  getAllPromotions: async (req, res, next) => {
    try {
      const user = req.user;
      console.log(req.body);
      if (user.is_admin !== true) {
        throw new HttpError("Không đủ thẩm quản", 403);
      }
      const promotions = await Promotion.findAll();
      return res.json({ message: "get data successfully", data: promotions });
    } catch (error) {
      next(error);
    }
  },
  editPromotionById: async (req, res, next) => {
    try {
      const user = req.user;
      if (user.is_admin !== true) {
        throw new HttpError("Không đủ thẩm quản", 403);
      }
      const { proId } = req.query;

      const supplier = await Promotion.findByPk(proId);
      if (!supplier) {
        throw new HttpError("Không tìm thấy mã giảm giá cần tìm", 404);
      }
      const { value } = req.body;
      await Promotion.update(
        {
          discount_value: +value,
        },
        {
          where: { promotion_id: proId },
        }
      );
      return res.json({ message: "Cập nhật mã giảm giá thành công" });
    } catch (error) {
      next(error);
    }
  },
  getAllAccounts: async (req, res, next) => {
    try {
      const user = req.user;
      console.log(req.body);
      if (user.is_admin !== true) {
        throw new HttpError("Không đủ thẩm quản", 403);
      }
      const accounts = await Account.findAll({ where: { is_admin: false } });
      return res.json({ message: "get data successfully", data: accounts });
    } catch (error) {
      next(error);
    }
  },
  lockAccountById: async (req, res, next) => {
    try {
      const user = req.user;
      console.log(req.body);
      if (user.is_admin !== true) {
        throw new HttpError("Không đủ thẩm quản", 403);
      }
      const { accId } = req.query;
      const account = await Account.findAll({ where: { account_id: accId } });
      if (!account) {
        throw new HttpError("Không tìm thấy người dùng cần khóa", 404);
      }
      await Account.update({ is_lock: 1 }, { where: { account_id: accId } });
      return res.json({ message: "Khóa tài khoản thành công" });
    } catch (error) {
      next(error);
    }
  },
  getAllCategories: async (req, res, next) => {
    try {
      const user = req.user;
      console.log(req.body);
      if (user.is_admin !== true) {
        throw new HttpError("Không đủ thẩm quản", 403);
      }
      const Categories = await Category.findAll();
      return res.json({ message: "get data successfully", data: Categories });
    } catch (error) {
      next(error);
    }
  },
  createCategorie: async (req, res, next) => {
    try {
      const user = req.user;
      console.log(req.body);
      if (user.is_admin !== true) {
        throw new HttpError("Không đủ thẩm quản", 403);
      }
      const { cname, cdes } = req.body;
      const newCate = await Category.create({
        categories_name: cname,
        categories_description: cdes,
      });
      return res.status(201).json({
        message: "Thêm danh mục thành công",
        category: newCate,
      });
    } catch (error) {
      next(error);
    }
  },
  getAllSuppliers: async (req, res, next) => {
    try {
      const user = req.user;
      console.log(req.body);
      if (user.is_admin !== true) {
        throw new HttpError("Không đủ thẩm quản", 403);
      }
      const suppliers = await Supplier.findAll();
      return res.json({ message: "get data successfully", data: suppliers });
    } catch (error) {
      next(error);
    }
  },
  createSupplier: async (req, res, next) => {
    try {
      const user = req.user;
      console.log(req.body);
      if (user.is_admin !== true) {
        throw new HttpError("Không đủ thẩm quản", 403);
      }
      const { sname, name, email, phone, address, detail } = req.body;
      const newCate = await Supplier.create({
        supplier_name: sname,
        contact_name: name,
        contact_email: email,
        contact_phone: phone,
        supplier_address: address,
        supplier_detail: detail,
      });
      return res.status(201).json({
        message: "Thêm hãng sản xuất mới thành công thành công",
        category: newCate,
      });
    } catch (error) {
      next(error);
    }
  },
  editSupplierById: async (req, res, next) => {
    try {
      const user = req.user;
      if (user.is_admin !== true) {
        throw new HttpError("Không đủ thẩm quản", 403);
      }
      const { supId } = req.query;

      const supplier = await Supplier.findByPk(supId);
      if (!supplier) {
        throw new HttpError("Không tìm thấy hãng sản xuất cần tìm", 404);
      }
      const { name, email, phone } = req.body;
      await Supplier.update(
        {
          contact_name: name,
          contact_email: email,
          contact_phone: phone,
        },
        {
          where: { supplier_id: supId },
        }
      );
      return res.json({ message: "Cập nhật hãng sản xuất thành công" });
    } catch (error) {
      next(error);
    }
  },
  getProductById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = req.user;
      console.log(req.body);
      if (user.is_admin !== true) {
        throw new HttpError("Không đủ thẩm quản", 403);
      }
      const pr = await Product.findByPk(id);
      if (!pr) {
        throw new HttpError("Sản phẩm không tồn tại", 404);
      }
      return res.json({
        message: "get data successfully",
        data: pr,
      });
    } catch (error) {
      next(error);
    }
  },
  createProduct: async (req, res, next) => {
    try {
      const transaction = await sequelize.transaction();
      const user = req.user;
      console.log(req.body);
      if (user.is_admin !== true) {
        throw new HttpError("Không đủ thẩm quản", 403);
      }
      const file = req.file;
      if (!file) {
        throw new HttpError("Bạn cần tải lên một file ảnh", 400);
      }
      const { size, filename, mimetype } = file;

      console.log(MINE_TYPE[mimetype], mimetype);
      if (MINE_TYPE[mimetype] === undefined) {
        throw new HttpError("Bạn chọn ảnh nhé", 301);
      }
      if (size > 1000000) {
        throw new HttpError("File ảnh có dung lượng quá lớn", 400);
      }
      let { name, cate_id, sup_id, promotion_id, price, quantity, is_new } =
        req.body;
      const categoryExist = await Category.findByPk(+cate_id);
      if (!categoryExist) {
        throw new HttpError("Mã danh mục không tồn tại", 404);
      }
      const supplierExist = await Supplier.findByPk(+sup_id);
      if (!supplierExist) {
        throw new HttpError("Mã nhà sản xuất không tồn tại", 404);
      }
      const promotionExist = await Promotion.findByPk(promotion_id);
      if (!promotionExist) {
        promotion_id = null;
      }
      const newProduct = await Product.create(
        {
          product_name: name,
          categories_id: +cate_id,
          supplier_id: +sup_id,
          promotion_id: promotion_id,
          product_price: price,
          quantity: quantity,
          is_new: +is_new,
          product_image_url: filename,
        },
        { transaction }
      );
      if (+cate_id === 1 || +cate_id === 2 || +cate_id === 3) {
        const { os, screen, chip, rom, ram, camera, pin, connect, accory } =
          req.body;
        if (+cate_id === 3) {
          const { card, cardRam } = req.body;
          const laptop = await Laptop.create(
            {
              product_id: newProduct.product_id,
              laptop_os: os,
              laptop_screen: screen,
              laptop_chip: chip,
              laptop_rom: rom,
              laptop_ram: ram,
              laptop_camera: camera,
              laptop_pin: pin,
              laptop_connect: connect,
              laptop_accessory: accory,
              laptop_card_graphic: card,
              laptop_card_ram: cardRam,
            },
            { transaction }
          );
        } else {
          const mobile = await MobileDevice.create(
            {
              product_id: newProduct.product_id,
              mobile_os: os,
              mobile_screen: screen,
              mobile_chip: chip,
              mobile_rom: rom,
              mobile_ram: ram,
              mobile_camera: camera,
              mobile_pin: pin,
              mobile_connect: connect,
              mobile_accessory: accory,
            },
            { transaction }
          );
        }
      } else {
        const { size, weight, sku } = req.body;
        const acco = await Accessory.create(
          {
            product_id: newProduct.product_id,
            accessory_size: size,
            accessory_weight: weight,
            accessory_sku: sku,
          },
          { transaction }
        );
      }
      await transaction.commit();
      return res.status(201).json({ message: "Thêm sản phẩm thành công" });
    } catch (error) {
      if (transaction && !transaction.finished) await transaction.rollback();
      next(error);
    }
  },
  editProductById: async (req, res, next) => {
    try {
      const user = req.user;
      if (user.is_admin !== true) {
        throw new HttpError("Không đủ thẩm quản", 403);
      }
      const file = req.file;

      if (!file) {
        throw new HttpError("Đm chọn file ảnh đi", 404);
      }
      console.log(file);
      const { size, filename, mimetype } = file;

      console.log(MINE_TYPE[mimetype], mimetype);
      if (MINE_TYPE[mimetype] === undefined) {
        throw new HttpError("Bạn chọn ảnh nhé", 301);
      }
      if (size > 1000000) {
        throw new HttpError("File ảnh có dung lượng quá lớn", 400);
      }
      const { id } = req.query;
      const productExist = await Product.findByPk(id);
      if (!productExist) {
        throw new HttpError("Sản phẩm cần sửa không có trong cửa hàng", 404);
      }
      let { name, price, quantity, promotion_id } = req.body;
      const promotionExist = await Promotion.findByPk(promotion_id);
      if (!promotionExist) {
        promotion_id = null;
      }
      const imagePath = "uploads/" + productExist.product_image_url;
      const absolutePath = path.resolve(imagePath);
      fs.unlinkSync(absolutePath);
      await Product.update(
        {
          product_name: name,
          product_price: +price,
          quantity: +quantity,
          product_image_url: filename,
          promotion_id: promotion_id ? +promotion_id : null,
        },
        { where: { product_id: id } }
      );
      return res.status(200).json({ message: "Cập nhật sản phẩm thành công" });
    } catch (error) {
      next(error);
    }
  },
  editOrderById: async (req, res, next) => {
    try {
      const user = req.user;
      console.log(user);
      if (user.is_admin !== true) {
        throw new HttpError("Không đủ thẩm quản", 403);
      }
      const { status } = req.body;
      const { id } = req.query;
      console.log(id, status);
      const order = await Order.update(
        { status: status },
        { where: { order_id: id } }
      );
      if (!order) {
        throw new HttpError("Không tìm thấy đơn hàng", 404);
      }
      return res.json({ message: "Cập nhật đơn hàng thành công", data: order });
    } catch (error) {
      next(error);
    }
  },
  getOrders: async (req, res, next) => {
    try {
      const user = req.user;
      console.log(user);
      if (user.is_admin !== true) {
        throw new HttpError("Không đủ thẩm quản", 403);
      }
      const orders = await Order.findAll();
      return res.json({ message: "get data successfully", data: orders });
    } catch (error) {
      next(error);
    }
  },
  getAnOrder: async (req, res, next) => {
    try {
      const user = req.user;
      console.log(user);
      if (user.is_admin !== true) {
        throw new HttpError("Không đủ thẩm quản", 403);
      }
      const { order_id } = req.query;
      const order = await Order.findOne({
        where: { order_id: order_id },
        include: [
          {
            model: Customer,
            attributes: ["fisrt_name", "last_name", "address", "email"],
          },
        ],
      });
      if (!order) {
        throw new HttpError("Không tìm thấy đơn hàng phù hợp", 404);
      }
      const orderDetail = await OrderDetail.findAll({
        where: { order_id: order.order_id },
        attributes: ["quanity", "unit_price", "sub_total", "order_detail_id"],
        include: [
          { model: Product, attributes: ["product_name", "product_image_url"] },
        ],
      });
      return res.json({ order, orderDetail });
    } catch (error) {
      next(error);
    }
  },
  deleteProductById: async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const user = req.user;
      if (user.is_admin !== true) {
        throw new HttpError("Không đủ thẩm quản", 403);
      }
      const { id, cid } = req.query;
      const productExist = await Product.findByPk(id);
      if (!productExist) {
        throw new HttpError("Sản phẩm không có trong cửa hàng", 404);
      }
      switch (cid) {
        case "1":
        case "2":
          await MobileDevice.destroy(
            {
              where: {
                product_id: id,
              },
            },
            { transaction }
          );
          break;
        case "3":
          await Laptop.destroy(
            {
              where: {
                product_id: id,
              },
            },
            { transaction }
          );
          break;
        case "4":
          await Accessory.destroy(
            {
              where: {
                product_id: id,
              },
            },
            { transaction }
          );
          break;
        default:
          throw new HttpError(
            "Sản phẩm cần xóa không nằm trong một danh mục sản phẩm nào cả",
            404
          );
      }
      await Product.destroy(
        {
          where: {
            product_id: id,
          },
        },
        { transaction }
      );
      await transaction.commit();
      return res.json({ message: "Xóa sản phẩm thành công" });
    } catch (error) {
      if (transaction && !transaction.finished) await transaction.rollback();
      next(error);
    }
  },
  // getCategories: async(req, res, next) => {

  // }
};

module.exports = adminControllers;
