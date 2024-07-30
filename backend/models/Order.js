const { DataTypes } = require("sequelize");
const db = require("../utils/connectDB");
const Customer = require("./Customer");
const Account = require("./Account");

const Order = db.define(
  "Order",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Account,
        key: "account_id",
      },
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "customer_id",
      },
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    payment_methods: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    code: {
      type: DataTypes.CHAR(8),
      allowNull: true,
    },
  },
  { timestamps: true }
);

Order.belongsTo(Account, { foreignKey: "account_id" });
Order.belongsTo(Customer, { foreignKey: "customer_id" });

module.exports = Order;
