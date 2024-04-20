const path = require("path");
const axios = require("axios");

function login(req, res, next) {
    console.log(req.method, req.url);
    // if (req.body.electronToken === "2d7b1a1f73088b0a36e759c689a7ca0b29af15bbae286b67cf1ab7f41d994e24d190e78ba9c8744845b6ae4ba12e9594f2155c610c527d24a3ab8d083ad2afbc") {
        res.render(path.join(__dirname, "../", "views", "login"), { errors: req.flash("errors"), success: req.flash("success") });
    // }
    // res.sendStatus(404);
}

function register(req, res, next) {
    console.log(req.method, req.url);
    res.render(path.join(__dirname, "../", "views", "register"), { errors: req.flash("errors") });
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

module.exports = { login, register, login_user, register_user, logout };
