const mongoose = require("mongoose");

const BacSiSchema = new mongoose.Schema({
  ten: { type: String, required: true },
  chuyenKhoa: { type: String, required: true },
  // 1 bác sĩ có nhiều bệnh nhân
  benhNhans: [{ type: mongoose.Schema.Types.ObjectId, ref: "BenhNhan" }]
});

module.exports = mongoose.model("BacSi", BacSiSchema);
