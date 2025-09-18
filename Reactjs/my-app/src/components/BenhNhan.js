import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/benhnhan";

function BenhNhan() {
  const [benhnhans, setBenhnhans] = useState([]);
  const [form, setForm] = useState({ ten: "", tuoi: "" });
  const [editId, setEditId] = useState(null);

  // Lấy danh sách từ backend
  const fetchData = async () => {
    const res = await axios.get(API_URL);
    setBenhnhans(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Thêm / Sửa
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ ten: "", tuoi: "", diaChi: "" });
    setEditId(null);
    fetchData();
  };

  // Xóa
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchData();
  };

  // Chọn để sửa
  const handleEdit = (bn) => {
    setForm({ hoTen: bn.ten, tuoi: bn.tuoi});
    setEditId(bn._id);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý Bệnh Nhân</h2>

      {/* Form thêm/sửa */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Họ tên"
          value={form.hoTen}
          onChange={(e) => setForm({ ...form, ten: e.target.value })}
        />
        <input
          type="number"
          placeholder="Tuổi"
          value={form.tuoi}
          onChange={(e) => setForm({ ...form, tuoi: e.target.value })}
        />
        {/* <input
          type="text"
          placeholder="Địa chỉ"
          value={form.diaChi}
          onChange={(e) => setForm({ ...form, diaChi: e.target.value })}
        /> */}
        <button type="submit">{editId ? "Cập nhật" : "Thêm mới"}</button>
      </form>

      {/* Danh sách */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Tuổi</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {benhnhans.map((bn) => (
            <tr key={bn._id}>
              <td>{bn.ten}</td>
              <td>{bn.tuoi}</td>
              <td>
                <button onClick={() => handleEdit(bn)}>Sửa</button>
                <button onClick={() => handleDelete(bn._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BenhNhan;
