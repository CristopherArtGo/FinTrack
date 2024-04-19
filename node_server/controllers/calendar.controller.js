const path = require("path");
const axios = require("axios");

function calendar(req, res, next) {
    console.log(req.method, req.url);
    if (!req.session.user) {
        res.redirect("/login");
    }

    axios.get(`http://localhost:3000/calendar/${req.session.user.user_id}`).then((response) => {
        console.log(response.data);
        res.render(path.join(__dirname, "../", "views", "calendar"), { events_today: response.data.events_today, upcoming_events: response.data.upcoming_events });
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

module.exports = { calendar, getAllEvents };
