const Express = require("express");
const Router = Express.Router();
const UsersController = require(`./controllers/usersController`);
Router.get("/", UsersController.index);
module.exports = Router;
