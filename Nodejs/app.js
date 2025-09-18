const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello từ Express.js 🚀</h1>");
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
