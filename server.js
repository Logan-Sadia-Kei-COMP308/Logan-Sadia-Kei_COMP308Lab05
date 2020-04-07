/** 
 * COMP308Lab05:
 * Date: Apr 7, 2020
 * Author: Sadia Rashid, Logan Junhwi Kim, Kei Mizubuchi
 *
 *  Sadia Rashid
 * - Implemented Summarized by URL
 * - Made overall design improvement
 * - Worked in pair programming
 * 
 * Logan Junhwi Kim
 * - Implemented Summarized by File
 * - Made overall design improvement
 * - Worked in pair programming
 *
 * Kei Mizubuchi:
 * - Analyzed and refactored the start code, and added comment
 * - Did research on web scraping and fixed bugs
 * - Worked in pair programming
 * 
 * Reference:
 * background image retrieved from:
 * https://www.thejakartapost.com/life/2016/05/17/12-indonesian-books-you-should-add-to-your-reading-list.html
 * 
 * */

// //////////////////////////
// The server.js file is the main file of your Node.js application
// It will load the express.js file as a module to bootstrap your Express application
//
//The process.env.NODE_ENV variable is set to the default 'development‘
//value if itdoesn 't exist.
// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || "development";
// Load the module dependencies
var express = require("./config/express");
// Create a new Mongoose connection instance
// Create a new Express application instance
var app = express();
// Use the Express application instance to listen to the '3000' port
app.listen(5000);
// Use the module.exports property to expose our Express application instance for external usage
module.exports = app; //returns the application object
// Log the server status to the console
console.log("Server running at http://localhost:5000/");
