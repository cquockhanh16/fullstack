const { DataTypes } = require("sequelize");
const db = require("../utils/connectDB");

const Product = require("./Product");

const Accessory = db.define(
  "Accessory",
  {
    accessory_id: {
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
    accessory_size: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    accessory_weight: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    accessory_sku: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  { tableName: "accessories", timestamps: true }
);

Accessory.belongsTo(Product, { foreignKey: "product_id" });

module.exports = Accessory;
