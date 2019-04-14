// Initialize Axios for http methods
const axios = require('axios');
// Initialize cheerio for scraping the web
const cheerio = require('cheerio');
// Import Database Models
const db = require("../models");

module.exports = function (app) {

    // Root
    app.get("/", function (req, res) {
        res.render("index", {});
    });

    // Incorrect Link
    app.get("*", function (req, res) {
        res.render("404");
    });

}