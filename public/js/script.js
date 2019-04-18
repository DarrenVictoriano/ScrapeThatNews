// Hide form on load
$(".form-group").hide();
//$("#scrape-btn").hide();

// Show Scrape data button if there are not articles yet.
$.getJSON("/api/article/all", function (data) {
    console.log(data);
    if (!data[0]) {
        //$("#scrape-btn").show();
    } else {
        //$("#scrape-btn").hide();
    }
});

function createNoteDiv(body, id) {

    let noteDiv = $("<div>");
    noteDiv.addClass("alert alert-dark alert-dismissible fade show");
    noteDiv.attr("role", "alert");
    noteDiv.text(body);

    // Delete button to delete the note
    let deleteNote = $("<button>");
    deleteNote.addClass("delete-note");
    deleteNote.attr("type", "button");
    deleteNote.attr("data-dismiss", "alert");
    deleteNote.attr("aria-label", "Close");
    deleteNote.attr("data-id", id);
    deleteNote.addClass("close");

    let closeIcon = $("<span>");
    closeIcon.attr("aria-hidden", "true");
    closeIcon.text("×");

    // append elements 
    closeIcon.appendTo(deleteNote);
    deleteNote.appendTo(noteDiv);
    noteDiv.appendTo($("#note-wrapper"));

};

// Scrape
$("#scrape-btn").on("click", function (e) {
    e.preventDefault();

    $.ajax({
        method: "GET",
        url: "/api/article/delete/all"
    }).then(function (data) {
        console.log(data);
        $.ajax({
            method: "GET",
            url: "/scrape"
        }).then(function (data) {
            console.log(data);
            window.location.replace("/");
        });

    });

});

// Save article to SavedArticleDB
$(".saveArticle").on("click", function (e) {
    e.preventDefault();

    $.ajax({
        method: "GET",
        url: "/api/article/" + $(this).attr("data-id")
    }).then(function (data) {
        console.log(data);

        $.ajax({
            method: "POST",
            url: "/api/savedarticle/add",
            data: {
                title: data.title,
                summary: data.summary,
                link: data.link
            }
        }).then(function (data) {
            console.log(data);
        });

    });

    $.ajax({
        method: "GET",
        url: "/api/article/delete/" + $(this).attr("data-id")
    }).then(function (data) {
        console.log(data);

    });

    $(this).parents('.theArticle').fadeOut();


});

// Delete Saved Article
$(".delete-saved").on("click", function (e) {

    e.preventDefault();

    $.ajax({
        method: "GET",
        url: "/api/savedarticle/delete/" + $(this).attr("data-id")
    }).then(function (data) {
        console.log(data);
    });

    $(this).parents('.theArticle').fadeOut();

});

// Open modal then pass title
$(".open-modal").on("click", function () {

    $("#title-notes").text($(this).attr("data-title"));
    $("#add-note").attr("data-id", $(this).attr("data-id"));
    $("#note-wrapper").empty();

    $.ajax({
        method: "GET",
        url: "/api/savedarticle/" + $(this).attr("data-id")
    }).then(function (data) {
        console.log(data);
        // Div that holds the note
        for (i in data.note) {
            createNoteDiv(data.note[i].body, data.note[i]._id);
        }


    });

});

// Save or Update Notes
$("#add-note").on("click", function () {

    let noteTextArea = $("#noteTextArea").val();

    $.ajax({
        method: "POST",
        url: "/api/savedarticle/note/" + $(this).attr("data-id"),
        data: {
            body: noteTextArea
        }
    }).then(function (data) {
        $("#note-wrapper").empty();
        for (i in data.note) {
            createNoteDiv(data.note[i].body, data.note[i]._id);
        }
    });

    $("#noteTextArea").val("");

});

// Delete Note
$("body").on("click", ".delete-note", function () {

    $.ajax({
        method: "GET",
        url: "/api/savedarticle/note/delete/" + $(this).attr("data-id")
    }).then(function (data) {
        console.log(data);
    });

});
