// npm install request --save
// npm install cheerio --save
// npm install request-promise
module.exports = async (articleUrl) => {
  const rp = require("request-promise");
  const cheerio = require("cheerio");

  console.log("Url.=>>>>" + articleUrl);
  const options = {
    transform: (body) => {
      return cheerio.load(body);
    },
  };

  // make HTTP request, get the response, extract the text from p tag
  let content = rp.get(
    articleUrl,
    options
  )
    .then(($) => {
      return $("p").text();
    })
    .then((text) => {
      return text;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return content;
}
