const { DataTypes } = require("sequelize");
const db = require("../utils/connectDB");
const Product = require("./Product");

const Laptop = db.define(
  "Laptop",
  {
    laptop_id: {
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
    laptop_os: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    laptop_screen: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    laptop_chip: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    laptop_rom: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    laptop_ram: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    laptop_camera: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    laptop_pin: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    laptop_connect: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    laptop_accessory: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    laptop_card_graphic: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    laptop_card_ram: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
  },
  {
    tableName: "laptops",
    timestamps: true,
  }
);

Laptop.belongsTo(Product, { foreignKey: "product_id" });

module.exports = Laptop;
