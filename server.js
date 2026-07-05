const express = require("express");
const db = require("./db");

const app = express();
const PORT = 3000;

// publicフォルダを公開
app.use(express.static("public"));

// JSONを受け取れるようにする
app.use(express.json());

// キャラ取得API
app.get("/api/cards", (req, res) => {
    db.all("SELECT * FROM characters", [], (err, rows) => {
        if (err) {
            return res.status(500).send("DBエラー");
        }

        res.json(rows);
    });
});


app.listen(PORT, "0.0.0.0", () => {
    console.log("Server started!");
});