// const { DataTypes } = require("sequelize");
// const db = require("../utils/connectDB");
// const Promotion = require("./Promotion");
// const Product = require("./Product");

// const ProductPromotion = db.define(
//   "ProductPromotion",
//   {
//     product_promotion_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     product_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: Product,
//         key: "product_id",
//       },
//     },
//     promotion_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: Promotion,
//         key: "promotion_id",
//       },
//     },
//   },
//   { timestamps: false }
// );

// ProductPromotion.belongsTo(Promotion, { foreignKey: "promotion_id" });
// ProductPromotion.belongsTo(Product, { foreignKey: "product_id" });

// module.exports = ProductPromotion;
