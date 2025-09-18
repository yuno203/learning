const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.get("/api/chao",(reg, res) =>{
    res.json({
        message:  "đã hoàn thành"
    })
})

app.listen(port,() =>{
    console.log(`http://localhost${port}`)
})