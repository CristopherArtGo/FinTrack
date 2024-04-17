const path = require("path");
const model = require(path.join(__dirname, "../", "models", "User"));

function index(req, res, next) {
    req.session.flash = { dbQuery: "" };
    res.render(path.join(__dirname, "../", "views", "register.ejs"));
}

module.exports = { index };
