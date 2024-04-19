const Express = require("express");
const Router = Express.Router();
const UsersController = require(`./controllers/users.controller`);
const DashboardController = require(`./controllers/dashboard.controller`);
const AccountsController = require(`./controllers/accounts.controller`);

Router.get("/login", UsersController.login);
Router.get("/register", UsersController.register);
Router.get("/dashboard", DashboardController.dashboard);
Router.get("/accounts", AccountsController.accounts);
Router.get("/calendar", UsersController.calendar);
Router.post("/register_user", UsersController.register_user);
Router.post("/login_user", UsersController.login_user);
Router.get("/logout", UsersController.logout);

module.exports = Router;
