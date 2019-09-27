const Router = require("express").Router();
const controllers = require("../controllers/");
const authentication = require("../middlewares/authentication")

Router.get("/all", controllers.Question.all);
Router.get("/show/:id", controllers.Question.show)

Router.use(authentication)
Router.post("/create", controllers.Question.store);
Router.get("/my", controllers.Question.my)

Router.post("/upvote", controllers.Question.upvote);
Router.post("/downvote", controllers.Question.downvote);

module.exports = Router;
