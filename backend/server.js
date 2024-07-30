// Import Express.js module
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const shopRoute = require("./routes/shop-route");
const userRoute = require("./routes/user-route");
const adminRoute = require("./routes/admin-route");
const HttpError = require("./models/HttpError");

// Create Express application
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1/", userRoute);
app.use("/api/v1/shop", shopRoute);
app.use("/api/v1/admin", adminRoute);

// Middleware để bắt lỗi route không được định nghĩa
app.use((req, res, next) => {
  next(new HttpError("Not found", 404));
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (error) => {
      "Error";
    });
  }
  res.status(err.errorCode || 500);
  res.json({
    error: {
      message: err.message || "Internal server error",
    },
  });
});

// Start the server
const port = 2000; // You can change the port number if needed
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
