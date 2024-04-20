const Express = require("express");
const Router = Express.Router();
const UsersController = require(`./controllers/users.controller`);
const DashboardController = require(`./controllers/dashboard.controller`);
const AccountsController = require(`./controllers/accounts.controller`);
const CalendarController = require(`./controllers/calendar.controller`);

Router.post("/login", UsersController.login);
Router.get("/login", UsersController.login);
Router.get("/register", UsersController.register);
Router.get("/dashboard", DashboardController.dashboard);
Router.get("/accounts", AccountsController.accounts);
Router.get("/calendar", CalendarController.calendar);
Router.post("/register_user", UsersController.register_user);
Router.post("/login_user", UsersController.login_user);
Router.get("/logout", UsersController.logout);
Router.get("/get_all_events", CalendarController.getAllEvents);
module.exports = Router;
