const db = require('../db');

// 全キャラ取得
function getAllCharacters(callback) {
  db.all(`SELECT * FROM characters`, [], callback);
}

module.exports = {
  getAllCharacters
};