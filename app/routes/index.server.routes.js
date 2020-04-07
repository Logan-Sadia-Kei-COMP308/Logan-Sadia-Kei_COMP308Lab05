//This uses CommonJS module pattern to export a single module function.
//This function takes an express object as argument

//Load the 'index' controller
var index = require("../controllers/index.server.controller");
//
//handle routing for get and post request
module.exports = function (app) {
  //handle a get request made to root path
  //go to http://localhost:3000/
  app.get("/", index.render);
  app.get("/home", index.render);
  app.route("/result").get(index.render).post(index.renderResult);
app.route("/resultUrl").get(index.render).post(index.renderUrlResult);
};
