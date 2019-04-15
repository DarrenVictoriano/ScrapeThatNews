// Import Database Models
const db = require("../models");

module.exports = function (app) {

    // Root
    app.get("/", function (req, res) {
        // saved the fetched article to mongodb
        db.Article.find({}).then(function (dataArticles) {
            console.log(dataArticles);
            res.render("index", { dataArticles });
        }).catch(function (err) {
            console.log(err);
            res.render("scraped", {});
        });
    });

    // Incorrect Link
    app.get("*", function (req, res) {
        res.render("404");
    });

}