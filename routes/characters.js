const model = require("../models/characterModel");

module.exports = (req, res) => {

  if (req.url === "/characters") {
    model.getAllCharacters((err, rows) => {
      if (err) {
        res.writeHead(500);
        return res.end("エラー");
      }

      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8"
      });

      res.end(JSON.stringify(rows));
    });
  }

};