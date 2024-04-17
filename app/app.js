const express = require("express");
const app = express();
const path = require("path");
const config = require(path.join(__dirname, "config"));
const router = require("./routes");
const session = require("express-session");
const flash = require("connect-flash");
const PORT = 8000;
const responseTime = require("response-time");

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

//direct static files to assets folder
app.use(express.static(path.join(__dirname, "./assets")));

//getting response time
config.enabledProfiler ? app.use(responseTime()) : false;
app.use("/", router);
config.enabledProfiler ? app.use(config.enableProfiler.profiler) : false;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
