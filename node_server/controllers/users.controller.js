const path = require("path");
const axios = require("axios");

function login(req, res, next) {
    // console.log(req.method, req.url, req.flash('loginErrors'));
    res.render(path.join(__dirname, "../", "views", "login"), { errors: req.flash("loginErrors") });
}

function register(req, res, next) {
    console.log(req.method, req.url);
    res.render(path.join(__dirname, "../", "views", "register"));
}

function dashboard(req, res, next) {
    console.log(req.method, req.url);
    res.render(path.join(__dirname, "../", "views", "dashboard"));
}

function accounts(req, res, next) {
    console.log(req.method, req.url);
    res.render(path.join(__dirname, "../", "views", "accounts"));
}

function calendar(req, res, next) {
    console.log(req.method, req.url);
    res.render(path.join(__dirname, "../", "views", "calendar"));
}

function login_user(req, res, next) {
    console.log(req.method, req.url, req.body);
    axios
        .post("http://localhost:3000/login", req.body)
        .then((response) => {
            console.log(response.data);
            res.send(response.data);
            res.redirect("/dashboard");
        })
        .catch((err) => {
            req.flash("loginErrors", ["Invalid Credentials"]);
            // console.log(req.flash("loginErrors"));
            res.redirect("/login");
        });
}

module.exports = { login, register, dashboard, accounts, calendar, login_user };
