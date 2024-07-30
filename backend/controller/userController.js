const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const dotenv = require("dotenv");
const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const HttpError = require("../models/HttpError");
const Account = require("../models/Account");
const Customer = require("../models/Customer");
const Product = require("../models/Product");
const sequelize = require("../utils/connectDB");
const crypto = require("crypto");
const { where } = require("sequelize");

dotenv.config();

const { SERCET_KEY_TOKEN, ACCESSKEY, SERCETKEY } = process.env;
const MINE_TYPE = {
  "image/png": "image/png",
  "image/jpg": "image/jpg",
  "image/jpeg": "image/jpeg",
  "image/png": "image/png",
};
const userControllers = {
  // dang ky tai khoan
  resgister: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      console.log(username, password);
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
      const userExist = await Account.findOne({
        where: { username: username },
      });
      if (userExist) {
        throw new HttpError("Tên người dùng đã tồn tại", 409);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await Account.create({
        username: username,
        password: hashedPassword,
        account_image: filename,
      });
      return res.status(201).json({
        message: "Đăng ký tài khoản thành công",
        user: newUser,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      console.log(username, password);
      const userExist = await Account.findOne({
        where: { username: username },
      });
      if (!userExist) {
        throw new HttpError("Tên người chưa tồn tại", 404);
      }
      const isMatch = await bcrypt.compare(password, userExist.password);
      if (!isMatch) {
        throw new HttpError("Mật khẩu không chính xác", 401);
      }
      if (userExist.is_lock) {
        throw new HttpError("Tài khoản của bạn đã bị khóa", 400);
      }
      const accessToken = await jwt.sign(
        {
          username: username,
          uid: userExist.account_id,
          is_admin: userExist.is_admin,
        },
        SERCET_KEY_TOKEN,
        {
          expiresIn: "7d",
        }
      );
      console.log(userExist);
      return res.status(200).json({
        message: "Đăng nhập thành công",
        uid: userExist.account_id,
        is_admin: userExist.is_admin,
        token: accessToken,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  order: async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const {
        first_name,
        last_name,
        company_name,
        country,
        address,
        city,
        code,
        email,
        products,
        note,
        status,
        phone_number,
        payment_methods,
        total_amount,
      } = req.body;
      const { uid } = req.user;
      console.log(req.body);
      const user = await Account.findByPk(uid);
      if (!user) {
        throw new HttpError("Tài khoản chưa được đăng ký", 404);
      }
      console.log(user.account_id);
      const newCustomer = await Customer.create(
        {
          fisrt_name: first_name,
          last_name: last_name,
          company_name: company_name,
          country: country,
          address: address,
          city: city,
          email: email,
          phone_number: phone_number,
        },
        { transaction }
      );
      const newOrder = await Order.create(
        {
          account_id: user.account_id, // Assuming 'customer_id' is the primary key of Customer
          customer_id: newCustomer.customer_id,
          total_amount: total_amount,
          status: +status,
          note: note,
          payment_methods: payment_methods,
          code: code,
        },
        { transaction }
      );
      let prs = [];
      products.forEach((element) => {
        let obj = {
          order_id: newOrder.order_id,
          product_id: element.product_id,
          quanity: element.count,
          unit_price: element.product_price,
          sub_total: +element.count * +element.product_price,
        };
        prs.push(obj);
      });
      const newOrderDetails = await OrderDetail.bulkCreate(prs, {
        transaction,
      });
      for (let element of products) {
        const product = await Product.findByPk(element.product_id, {
          transaction,
        });
        if (!product) {
          throw new HttpError(`Không tìm thấy sản phẩm`, 404);
        }
        if (product.quantity < element.count) {
          throw new HttpError(`Số lượng sản phẩm trong cửa hàng không đủ`, 400);
        }
        product.quantity -= element.count;
        await product.save({ transaction });
      }

      await transaction.commit();
      return res.status(201).json({
        message: "Đã đặt hàng thành công",
        order: newOrder,
      });
    } catch (error) {
      if (transaction && !transaction.finished) await transaction.rollback();
      console.error("Transaction rolled back due to error:", error);
      next(error);
    }
  },
  getAllOrders: async (req, res, next) => {
    try {
      const { uid } = req.user;
      const user = await Account.findByPk(uid);
      if (!user) {
        throw new HttpError("Tài khoản chưa được đăng ký", 404);
      }
      const orders = await Order.findAll({
        where: { account_id: uid },
      });
      if (!orders) {
        throw new HttpError("Không tìm thấy đơn hàng phù hợp", 404);
      }
      return res.json({ orders });
    } catch (error) {
      next(error);
    }
  },
  cancelOrderById: async (req, res, next) => {
    try {
      const { uid } = req.user;
      const { oid } = req.query;
      const user = await Account.findByPk(uid);
      if (!user) {
        throw new HttpError("Tài khoản chưa được đăng ký", 404);
      }
      const order = await Order.findOne({
        where: { account_id: uid, order_id: oid },
      });
      if (!order) {
        throw new HttpError("Không tìm thấy đơn hàng phù hợp", 404);
      }
      await Order.update(
        {
          status: 0,
        },
        { where: { account_id: uid, order_id: oid } }
      );
      return res.json({ order, message: "Hủy đơn hàng thành công" });
    } catch (error) {
      next(error);
    }
  },
  getOrder: async (req, res, next) => {
    try {
      const { uid } = req.user;
      const { order_id } = req.params;
      const order = await Order.findOne({
        where: { account_id: uid, order_id: order_id },
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
  getInformation: async (req, res, next) => {
    try {
      const { uid } = req.user;
      const user = await Account.findByPk(uid);
      if (!user) {
        throw new HttpError("Tài khoản chưa được đăng ký", 404);
      }
      return res.status(200).json({ message: "Lấy dữ liệu thành công", user });
    } catch (error) {
      next(error);
    }
  },
  getAnAvatar: async (req, res, next) => {
    try {
      const { uid } = req.user;
      const user = await Account.findByPk(uid);
      if (!user) {
        throw new HttpError("Tài khoản chưa được đăng ký", 404);
      }
      return res.status(200).json({
        message: "Lấy dữ liệu thành công",
        avatar: user.account_image,
      });
    } catch (error) {
      next(error);
    }
  },
  // payment: async (req, res, next) => {
  //   // let { orderIdd, amount } = req.body;
  //   // // console.log(orderIdd, amount);
  //   // var accessKey = ACCESSKEY;
  //   // var secretKey = SERCETKEY;
  //   // var orderInfo = "pay with MoMo";
  //   // var partnerCode = "MOMO";
  //   // var redirectUrl =
  //   //   "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
  //   // var ipnUrl = "https://5b91-118-71-64-71.ngrok-free.app/api/v1/callback";
  //   // var requestType = "payWithMethod";
  //   // // var amountt = +amount;
  //   // var orderId = partnerCode + new Date().getTime() + "-" + orderIdd;
  //   // var requestId = orderId;
  //   // var extraData = "";
  //   // var paymentCode =
  //   //   "T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==";
  //   // var orderGroupId = "";
  //   // var autoCapture = true;
  //   // var lang = "vi";
  //   var accessKey = "F8BBA842ECF85";
  //   var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  //   var orderInfo = "pay with MoMo";
  //   var partnerCode = "MOMO";
  //   var redirectUrl =
  //     "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
  //   var ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
  //   var requestType = "payWithMethod";
  //   var amount = "50000";
  //   var orderId = partnerCode + new Date().getTime();
  //   var requestId = orderId;
  //   var extraData = "";
  //   var paymentCode =
  //     "T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==";
  //   var orderGroupId = "";
  //   var autoCapture = true;
  //   var lang = "vi";

  //   //before sign HMAC SHA256 with format
  //   //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  //   var rawSignature =
  //     "accessKey=" +
  //     accessKey +
  //     "&amount=" +
  //     amount +
  //     "&extraData=" +
  //     extraData +
  //     "&ipnUrl=" +
  //     ipnUrl +
  //     "&orderId=" +
  //     orderId +
  //     "&orderInfo=" +
  //     orderInfo +
  //     "&partnerCode=" +
  //     partnerCode +
  //     "&redirectUrl=" +
  //     redirectUrl +
  //     "&requestId=" +
  //     requestId +
  //     "&requestType=" +
  //     requestType;
  //   //puts raw signature
  //   console.log("--------------------RAW SIGNATURE----------------");
  //   console.log(rawSignature);
  //   //signature
  //   var signature = crypto
  //     .createHmac("sha256", secretKey)
  //     .update(rawSignature)
  //     .digest("hex");
  //   console.log("--------------------SIGNATURE----------------");
  //   console.log(signature);

  //   //json object send to MoMo endpoint
  //   const requestBody = JSON.stringify({
  //     partnerCode: partnerCode,
  //     partnerName: "Test",
  //     storeId: "MomoTestStore",
  //     requestId: requestId,
  //     amount: amount,
  //     orderId: orderId,
  //     orderInfo: orderInfo,
  //     redirectUrl: redirectUrl,
  //     ipnUrl: ipnUrl,
  //     lang: lang,
  //     requestType: requestType,
  //     autoCapture: autoCapture,
  //     extraData: extraData,
  //     orderGroupId: orderGroupId,
  //     signature: signature,
  //   });
  //   //Create the HTTPS objects
  //   let result;
  //   try {
  //     result = await axios({
  //       method: "POST",
  //       url: "https://test-payment.momo.vn/v2/gateway/api/create",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Content-Length": Buffer.byteLength(requestBody),
  //       },
  //       data: requestBody,
  //     });

  //     console.log(res);

  //     return res.status(200).json({ data: result.data });
  //   } catch (error) {
  //     console.error(
  //       "Error response:",
  //       error.response ? error.response.data : error.message
  //     );
  //     next(error);
  //   }
  // },
  payment: async (req, res, next) => {
    try {
      let { orderIdd, amountt } = req.body;
      var partnerCode = "MOMO";
      var accessKey = ACCESSKEY;
      var secretkey = SERCETKEY;
      var requestId = partnerCode + new Date().getTime() + "-" + orderIdd;
      var orderId = requestId;
      var orderInfo = "pay with MoMo";
      var redirectUrl = "https://momo.vn/return";
      var ipnUrl = "http://localhost:2000/api/v1/callback";
      var amount = +amountt;
      var requestType = "captureWallet";
      var extraData = ""; //pass empty value if your merchant does not have stores

      //before sign HMAC SHA256 with format
      //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
      var rawSignature =
        "accessKey=" +
        accessKey +
        "&amount=" +
        amount +
        "&extraData=" +
        extraData +
        "&ipnUrl=" +
        ipnUrl +
        "&orderId=" +
        orderId +
        "&orderInfo=" +
        orderInfo +
        "&partnerCode=" +
        partnerCode +
        "&redirectUrl=" +
        redirectUrl +
        "&requestId=" +
        requestId +
        "&requestType=" +
        requestType;
      //puts raw signature
      // console.log("--------------------RAW SIGNATURE----------------");
      // console.log(rawSignature);
      //signature
      var signature = crypto
        .createHmac("sha256", secretkey)
        .update(rawSignature)
        .digest("hex");
      // console.log("--------------------SIGNATURE----------------");
      // console.log(signature);

      //json object send to MoMo endpoint
      const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: "vi",
      });
      let result;
      result = await axios({
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/create",

        // url: " https://test-payment.momo.vn/v2/gateway/querySession",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(requestBody),
        },
        data: requestBody,
      });

      // console.log(res);

      return res.status(200).json({ data: result.data });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  callback: async (req, res, next) => {
    // console.log("callback:   ");
    // console.log(req.body);
    // return res.status(200).json(req.body);
    try {
      const { orderId, resultCode } = req.body;
      if (resultCode !== 0) {
        throw new HttpError("Thanh toán không thành công", 500);
      }
      const id = orderId.split("-")[1];
      await Order.update(
        {
          status: 3,
        },
        { where: { order_id: id } }
      );
      return res
        .status(200)
        .json({ message: "Đơn hàng đã được thanh toán thành công!!" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userControllers;
