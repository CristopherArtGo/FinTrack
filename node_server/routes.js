const Express = require("express");
const Router = Express.Router();
const UsersController = require(`./controllers/users.controller`);
const DashboardController = require(`./controllers/dashboard.controller`);
const AccountsController = require(`./controllers/accounts.controller`);
const CalendarController = require(`./controllers/calendar.controller`);

Router.post("/login", UsersController.login);
Router.get("/login", UsersController.login);
Router.get("/register", UsersController.register);
Router.post("/register_user", UsersController.register_user);
Router.post("/login_user", UsersController.login_user);
Router.get("/logout", UsersController.logout);

Router.get("/dashboard", DashboardController.dashboard);

Router.get("/accounts", AccountsController.accounts);
Router.get("/account", AccountsController.account);
Router.post("/create_account", AccountsController.createAccount);
Router.post("/edit_account", AccountsController.editAccount);
Router.post("/create_transaction", AccountsController.createTransaction);
Router.get("/transaction", AccountsController.transaction);
Router.post("/edit_transaction", AccountsController.editTransaction);

Router.get("/calendar", CalendarController.calendar);
Router.get("/get_all_events", CalendarController.getAllEvents);
Router.get("/event", CalendarController.event);
Router.post("/create_event", CalendarController.createEvent);
Router.post("/edit_event", CalendarController.editEvent);

module.exports = Router;
