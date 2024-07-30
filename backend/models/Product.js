const { DataTypes } = require("sequelize");
const db = require("../utils/connectDB");
const Category = require("./Category");
const Supplier = require("./Supplier");
const Promotion = require("./Promotion");

const Product = db.define(
  "Product",
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categories_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "categories_id",
      },
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Supplier,
        key: "supplier_id",
      },
    },
    promotion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Promotion,
        key: "promotion_id",
      },
    },
    product_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    product_image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    product_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    is_new: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { timestamps: true, tableName: "products" }
);

Product.belongsTo(Promotion, { foreignKey: "promotion_id" });
Product.belongsTo(Category, { foreignKey: "categories_id" });
Product.belongsTo(Supplier, { foreignKey: "supplier_id" });

module.exports = Product;
