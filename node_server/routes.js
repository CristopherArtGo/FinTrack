const Express = require("express");
const Router = Express.Router();
const UsersController = require(`./controllers/users.controller`);

Router.get("/login", UsersController.login);
Router.get("/register", UsersController.register);
Router.get("/dashboard", UsersController.dashboard);
Router.get("/accounts", UsersController.accounts);
Router.get("/calendar", UsersController.calendar);
Router.post("/login_user", UsersController.login_user);

module.exports = Router;
