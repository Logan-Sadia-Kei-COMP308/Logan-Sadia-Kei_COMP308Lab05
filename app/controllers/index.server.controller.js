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

    const textSummarizer = require('../../TextSummarizer')
    const sentenceNumber = req.body.sentenceNumber;
    const articleContent = req.body.articleContent;

    // run summarizer
    let summary = textSummarizer(articleContent, sentenceNumber);

    // display the result
    console.log("=====original text=====");
    console.log(articleContent);
    console.log("\n");

    console.log(`=====${sentenceNumber}-sentence summary=====`);
    console.log(summary);
    console.log("\n");


    // res.render("index", {
    //   title: "Student - Course App",
    // });

    res.status(200).json({
        title: "Article Summarizer App",
        sentenceNumber: sentenceNumber,
        articleContent: articleContent,
        summary: summary
    });
};