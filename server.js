const express = require("express");
const db = require("./postgre");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());

// キャラ取得API
app.get("/api/cards", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM characters");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("DBエラー");
    }
});

db.query("SELECT NOW()")
    .then(result => {
        console.log("Neon接続成功！");
        console.log(result.rows[0]);
    })
    .catch(err => {
        console.error(err);
    });

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started! PORT: ${PORT}`);
});