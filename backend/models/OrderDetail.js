const { DataTypes } = require("sequelize");
const db = require("../utils/connectDB");

const Order = require("./Order");
const Product = require("./Product");

const OrderDetail = db.define(
  "OrderDetail",
  {
    order_detail_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "product_id",
      },
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: "order_id",
      },
    },
    quanity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    sub_total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "order_details" }
);

OrderDetail.belongsTo(Order, { foreignKey: "order_id" });
OrderDetail.belongsTo(Product, { foreignKey: "product_id" });

module.exports = OrderDetail;
