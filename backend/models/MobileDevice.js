const { DataTypes } = require("sequelize");
const db = require("../utils/connectDB");
const Product = require("./Product");

const MobileDevice = db.define(
  "MobileDevice",
  {
    mobile_id: {
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
    mobile_os: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    mobile_screen: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    mobile_chip: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    mobile_rom: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    mobile_ram: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    mobile_camera: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    mobile_pin: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    mobile_connect: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    mobile_accessory: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "mobile_devices",
    timestamps: true,
  }
);

MobileDevice.belongsTo(Product, { foreignKey: "product_id" });

module.exports = MobileDevice;
