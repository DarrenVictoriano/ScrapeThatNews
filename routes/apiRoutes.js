// Initialize Axios for http methods
const axios = require('axios');
// Initialize cheerio for scraping the web
const cheerio = require('cheerio');
// Import Database Models
const db = require("../models");

module.exports = function (app) {

    // Scrape Data then save it to MongoDB
    app.get("/scrape", function (req, res) {

        axios.get("https://www.studentnewsdaily.com/").then(function (response) {
            // Initialize cheerio
            let $ = cheerio.load(response.data);

            // find data you want to scrape via element selectors
            $("div.caption").each(function (i, element) {
                let result = {};
                // save the data into result object
                result.title = $(this).children("h4").children("a").text();
                result.summary = $(this).children("p").text();
                result.link = $(this).children("h4").children("a").attr("href");

                // saved the fetched article to Article Collection
                db.Article.create(result).then(function (dbArticle) {
                    console.log(dbArticle);
                    res.redirect("/");

                }).catch(function (err) {
                    console.log(err);
                });

            });
        }).catch(function (err) {
            console.log(err);
        });

    });

    // -------------------- Article DB ----------------------
    // Route for getting all the Articles from the DB
    app.get("/api/article/all", function (req, res) {
        db.Article.find({}).then(function (dbArticles) {
            res.json(dbArticles);
        }).catch(function (err) {
            res.json(err);
        });
    });

    // Routes for getting a specific article
    app.get("/api/article/:id", function (req, res) {
        // populate notes before sending it back
        db.Article.findOne({ _id: req.params.id }).populate("note")
            .then(function (dbArticle) {
                res.json(dbArticle);
            }).catch(function (err) {
                res.json(err);
            });
    });

    // Routes for saving / updating an Article Notes
    app.post("/api/article/:id", function (req, res) {
        console.log(req.body);
        db.Note.create(req.body).then(function (dbNote) {
            return db.SavedArticle.findOneAndUpdate({ _id: req.params.id },
                { note: dbNote._id }, { new: true });
        }).then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(function (err) {
            res.json(err);
        });
    });

    // Routes for deleting all articles from SavedArticle Collection
    app.get("/api/article/delete/all", function (req, res) {

        db.Article.deleteMany({}).then(function (dbArticle) {
            console.log("Deleted Article Collections: ", dbArticle);
            res.redirect("/");
        }).catch(function (err) {
            console.log(err)
            res.json(err);
        });
    });

    // Delete One Article
    app.get("/api/article/delete/:id", function (req, res) {

        db.Article.findByIdAndDelete({
            _id: req.params.id
        }).then(function (dbArticle) {
            console.log(dbArticle);
        }).catch(function (err) {
            console.log(err);
        });

    });

    // -------------------- SavedArticle DB ----------------------
    // Route for getting all the SavedArticles from the DB
    app.get("/api/savedarticle/all", function (req, res) {
        db.SavedArticle.find({}).then(function (dbArticles) {
            res.json(dbArticles);
        }).catch(function (err) {
            res.json(err);
        });
    });

    // Routes for getting a specific SavedArticle
    app.get("/api/savedarticle/:id", function (req, res) {
        // populate notes before sending it back
        db.SavedArticle.findOne({ _id: req.params.id }).populate("note")
            .then(function (dbArticle) {
                res.json(dbArticle);
            }).catch(function (err) {
                res.json(err);
            });
    });

    // Routes for saving / updating an SavedArticle Notes
    app.post("/api/savedarticle/note/:id", function (req, res) {
        console.log(req.body);

        db.Note.create(req.body).then(function (dbNote) {
            return db.SavedArticle.findOneAndUpdate({ _id: req.params.id },
                { note: dbNote._id }, { new: true });
        }).then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(function (err) {
            res.json(err);
        });
    });

    app.post("/api/savedarticle/add", function (req, res) {
        // saved the fetched article to Article Collection
        console.log(req.body);
        let newData = {
            title: req.body.title,
            summary: req.body.summary,
            link: req.body.link
        }

        db.SavedArticle.create(newData).then(function (dbArticle) {
            console.log(dbArticle);
            res.json(dbArticle);
        }).catch(function (err) {
            console.log(err);
            res.json(err);
        });

    });

    // Routes for deleting all articles from Article Collection
    app.get("/api/savedarticle/delete/all", function (req, res) {

        db.SavedArticle.deleteMany({}).then(function (dbArticle) {
            console.log("Deleted Article Collections: ", dbArticle);
            res.redirect("/savedarticle");
        }).catch(function (err) {
            console.log(err)
            res.json(err);
        });
    });

    // Delete One SavedArticle
    app.get("/api/savedarticle/delete/:id", function (req, res) {

        db.SavedArticle.findByIdAndDelete({
            _id: req.params.id
        }).then(function (dbArticle) {
            console.log(dbArticle);
        }).catch(function (err) {
            console.log(err);
        });

    });

}
