// npm install request --save
// npm install cheerio --save
// npm install request-promise
module.exports = (articleUrl) => {
const rp = require("request-promise");
const cheerio = require("cheerio");

var content;
console.log("Url.=>>>>"+articleUrl);
const options = {
  transform: (body) => {
    return cheerio.load(body);
  },
};

rp.get(
  articleUrl,
  options
)
  .then(($) => {
    return $(".meteredContent").text();
  })
  .then((text) => {
    console.log(text);
    this.content=text;
  })
  .catch((error) => {
    console.error("Error:", error);
  });
return content;

}
