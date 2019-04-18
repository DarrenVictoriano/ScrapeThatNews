const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SavedArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});

let SavedArticle = mongoose.model("SavedArticle", SavedArticleSchema);

module.exports = SavedArticle;
