const path = require("path");
const axios = require("axios");
const { error } = require("console");

function login(req, res, next) {
    console.log(req.method, req.url);
    res.render(path.join(__dirname, "../", "views", "login"), { errors: req.flash("errors"), success: req.flash("success") });
}

function register(req, res, next) {
    console.log(req.method, req.url);
    res.render(path.join(__dirname, "../", "views", "register"), { errors: req.flash("errors") });
}

function calendar(req, res, next) {
    console.log(req.method, req.url);
    res.render(path.join(__dirname, "../", "views", "calendar"));
}

function logout(req, res, next) {
    console.log(req.method, req.url);
    req.session.destroy();
    res.redirect("/login");
}

function register_user(req, res, next) {
    console.log(req.method, req.url, req.body);

    axios.post("http://localhost:3000/register", req.body).then((response) => {
        console.log(response.data);

        if (response.data.errors) {
            req.flash("errors", response.data.errors);
            res.redirect("/register");
        } else {
            req.flash("success", response.data.message);
            res.redirect("/login");
        }
    });
}

function login_user(req, res, next) {
    console.log(req.method, req.url, req.body);

    if (!req.body.email_address || !req.body.password) {
        let errors = ["Invalid Credentials"];
        req.flash("errors", errors);
        res.redirect("/login");
    } else {
        axios
            .post("http://localhost:3000/login", req.body)
            .then((response) => {
                // console.log(response.data);
                req.session.user = { user_id: response.data.user.id, email_address: response.data.user.email_address };
                res.redirect("/dashboard");
            })
            .catch((err) => {
                let errors = ["Invalid Credentials"];
                req.flash("errors", errors);
                res.redirect("/login");
            });
    }
}

// function objToParams(obj) {
//     const queryString = new URLSearchParams(obj);
//     return queryString.toString();
// }

module.exports = { login, register, calendar, login_user, register_user, logout };
