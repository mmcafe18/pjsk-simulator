const express = require("express");
const db = require("./postgre");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());
app.use(cors());

// キャラ取得API
app.get("/api/cards", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM cards");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("DBエラー");
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started! PORT: ${PORT}`);
});