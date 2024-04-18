const path = require("path");
const enableProfiler = require(path.join(__dirname, "libraries", "enableProfiler"));
const Mysql = require("mysql2");
const db = Mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "sports_players",
    port: 3306,
});
db.connect(function (err) {
    if (err) throw err;
    console.log("connected");
});

const enabledProfiler = true;

module.exports = { db, enableProfiler, enabledProfiler };
