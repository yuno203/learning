const express = require("express");
const mongoose = require("mongoose");   // ✅ chỉ khai báo 1 lần
const cors = require("cors");

const app = express();
app.use(cors()); // cho phép React gọi API

app.use(express.json());

// Kết nối MongoDB
mongoose.connect("mongodb://admin:123456@localhost:27017/clinic?authSource=admin")
  .then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch(err => console.error("❌ Lỗi kết nối:", err));

// Import routes
const bacsiRoutes = require("./project/routers/bacsi");
const benhnhanRoutes = require("./project/routers/benhnhan");

app.use("/bacsi", bacsiRoutes);
app.use("/benhnhan", benhnhanRoutes);

app.listen(5000, () => console.log("🚀 Server chạy tại http://localhost:5000"));
