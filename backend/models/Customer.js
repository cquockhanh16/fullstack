const { DataTypes } = require("sequelize");
const db = require("../utils/connectDB");
const Account = require("./Account");

const Customer = db.define(
  "Customer",
  {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fisrt_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    company_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    email: {
      type: DataTypes.CHAR(40),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  { timestamps: true, tableName: "customers" }
);

module.exports = Customer;
