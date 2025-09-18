const express = require("express");
const router = express.Router();
const BenhNhan = require("../models/BenhNhan");
const BacSi = require("../models/BacSi");

// Lấy tất cả bệnh nhân + bác sĩ của họ
router.get("/", async (req, res) => {
  const data = await BenhNhan.find().populate("bacSi");
  res.json(data);
});

// Thêm bệnh nhân và gắn vào bác sĩ
router.post("/", async (req, res) => {
  const { ten, tuoi, bacSiId } = req.body;

  const benhNhan = new BenhNhan({ ten, tuoi, bacSi: bacSiId });
  await benhNhan.save();

  // Thêm bệnh nhân vào danh sách của bác sĩ
  await BacSi.findByIdAndUpdate(bacSiId, { $push: { benhNhans: benhNhan._id } });

  res.json(benhNhan);
});

// Sửa bệnh nhân
router.put("/:id", async (req, res) => {
  const benhNhan = await BenhNhan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(benhNhan);
});

// Xóa bệnh nhân
router.delete("/:id", async (req, res) => {
  const benhNhan = await BenhNhan.findByIdAndDelete(req.params.id);

  // Xóa reference trong bác sĩ
  if (benhNhan && benhNhan.bacSi) {
    await BacSi.findByIdAndUpdate(benhNhan.bacSi, { $pull: { benhNhans: benhNhan._id } });
  }

  res.json({ message: "Đã xóa bệnh nhân" });
});

module.exports = router;
