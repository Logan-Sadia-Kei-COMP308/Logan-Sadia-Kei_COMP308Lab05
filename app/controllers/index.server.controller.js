// Create a new render method to render index.ejs
//
//You can require this module and use this function
//You'll need to use Express routing functionality to utilize the controller

exports.render = function (req, res) {
  //display index.ejs
  res.render("index", {
    title: "Student - Course App",
  });
};

exports.renderResult = function (req, res) {
  console.log("!!!");
  if (typeof req.body.uploadFile !== "undefined") {
    console.log(req.body.uploadFile);
    console.log(req.body.uploadFileContent);
  } else {
    console.log("undefined!!");
  }
};
