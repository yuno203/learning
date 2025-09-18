const mongoose = require("mongoose");

const BenhNhanSchema = new mongoose.Schema({
  ten: { type: String, required: true },
  tuoi: { type: Number, required: true },
  // bệnh nhân thuộc về 1 bác sĩ
  bacSi: { type: mongoose.Schema.Types.ObjectId, ref: "BacSi" }
});

module.exports = mongoose.model("BenhNhan", BenhNhanSchema);
