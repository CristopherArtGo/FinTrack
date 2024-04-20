const path = require("path");
const axios = require("axios");

function calendar(req, res, next) {
    console.log(req.method, req.url);
    if (!req.session.user) {
        res.redirect("/login");
    }

    axios.get(`http://localhost:3000/calendar/${req.session.user.user_id}`).then((response) => {
        console.log(response.data);
        res.render(path.join(__dirname, "../", "views", "calendar"), { events_today: response.data.events_today, upcoming_events: response.data.upcoming_events, errors: req.flash("errors") });
    });
}

function getAllEvents(req, res, next) {
    console.log(req.method, req.url);
    if (!req.session.user) {
        res.redirect("/login");
    }

    axios.get(`http://localhost:3000/all_events/${req.session.user.user_id}`).then((response) => {
        console.log(response.data);
        res.json({ events: response.data.events });
    });
}

function createEvent(req, res, next) {
    console.log(req.method, req.url, req.body);
    req.body.id = req.session.user.user_id;

    axios.post("http://localhost:3000/create_event", req.body).then((response) => {
        console.log(response.data);

        if (response.data.errors) {
            req.flash("errors", response.data.errors);
        } else {
            req.flash("success", response.data.message);
        }
        res.redirect("/calendar");
    });
}

module.exports = { calendar, getAllEvents, createEvent };
