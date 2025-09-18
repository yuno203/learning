const express = require("express");
const router = express.Router();
const BacSi = require("../models/BacSi");

// Lấy tất cả bác sĩ kèm bệnh nhân
router.get("/", async (req, res) => {
  const data = await BacSi.find().populate("benhNhans");
  res.json(data);
});

// Thêm bác sĩ
router.post("/", async (req, res) => {
  const bacSi = new BacSi(req.body);
  await bacSi.save();
  res.json(bacSi);
});

// Sửa bác sĩ
router.put("/:id", async (req, res) => {
  const bacSi = await BacSi.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(bacSi);
});

// Xóa bác sĩ
router.delete("/:id", async (req, res) => {
  await BacSi.findByIdAndDelete(req.params.id);
  res.json({ message: "Đã xóa bác sĩ" });
});

module.exports = router;
