// Initialize Axios for http methods
const axios = require('axios');
// Initialize cheerio for scraping the web
const cheerio = require('cheerio');
// Import Database Models
const db = require("../models");

module.exports = function (app) {

    app.get("/fetchArticles", function (req, res) {
        console.log("something");
    });

}
