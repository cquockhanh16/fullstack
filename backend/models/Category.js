const { DataTypes } = require("sequelize");
const db = require("../utils/connectDB");

// const Product = require("./Product");

const Category = db.define(
  "Category",
  {
    categories_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categories_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    categories_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "categories",
  }
);

// Category.hasMany(Product);

module.exports = Category;
