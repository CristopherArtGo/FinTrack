const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const router = require("./routes");
const flash = require("connect-flash");
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    session({
        secret: "user",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 },
    })
);
app.use(flash());

app.use(express.static(path.join(__dirname, "./assets")));
app.use("/", router);
app.set("view engine", "ejs");

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
