// Initialize Express
const express = require('express');
const app = express();

// Initialize Handlebars
const exphbs = require('express-handlebars');
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Initialize Morgan the logger
const logger = require('morgan');
app.use(logger("dev"));

// Initialize Mongoose for MongoDB
const mongoose = require('mongoose');

// Initialize Port
let PORT = 3030;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Connect to MongoDB
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";
mongoose.connect("mongodb://localhost/scraper", { useNewUrlParser: true });

//start server
app.listen(PORT, () => {
    console.log("App running on http://localhost:%s", PORT);
});