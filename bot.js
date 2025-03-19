const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// IP manzilni olish va faylga yozish
app.get("/", (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const date = new Date().toISOString();

    const logData = `${date} - IP: ${ip} - User Agent: ${userAgent}\n`;

    // Faylga yozish
    fs.appendFile("logs.txt", logData, (err) => {
        if (err) {
            console.error("Faylga yozishda xatolik:", err);
        }
    });

    console.log(logData);

    res.redirect("https://qiziltepa.uz/uz/"); // Istalgan saytga yo‘naltirish
});

app.listen(PORT, () => {
    console.log(`Server ${PORT} portda ishlayapti`);
});
