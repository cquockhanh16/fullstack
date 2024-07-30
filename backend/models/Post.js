const { DataTypes } = require("sequelize");
const db = require("../utils/connectDB");

const Post = db.define(
  "Post",
  {
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    post_title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    post_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: true }
);

module.exports = Post;
