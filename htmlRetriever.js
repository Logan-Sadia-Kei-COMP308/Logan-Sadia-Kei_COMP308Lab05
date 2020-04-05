// npm install request --save
// npm install cheerio --save
// npm install request-promise
const rp = require("request-promise");
const cheerio = require("cheerio");

const options = {
  transform: (body) => {
    return cheerio.load(body);
  },
};

rp.get(
  "https://www.nytimes.com/2020/04/05/world/europe/victor-orban-coronavirus.html",
  options
)
  .then(($) => {
    return $(".meteredContent").text();
  })
  .then((text) => {
    console.log(text);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
