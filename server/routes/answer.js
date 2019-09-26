const Router = require("express").Router();
const controllers = require("../controllers/");
const authentication = require("../middlewares/authentication");


Router.use(authentication);
Router.post("/create", controllers.Answer.create);

module.exports = Router;
