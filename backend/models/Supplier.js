const { DataTypes } = require("sequelize");
const db = require("../utils/connectDB");
const Supplier = db.define(
  "Supplier",
  {
    supplier_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    supplier_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    contact_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    contact_email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    contact_phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    supplier_address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    supplier_detail: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { timestamps: true }
);

module.exports = Supplier;
