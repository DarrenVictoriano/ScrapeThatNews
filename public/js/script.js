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

// Save or Update Notes
$("#saveNote").on("click", function () {
    let thisID = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/api/article/" + thisID,
        data: {
            title: $("#titleInput").val(),
            body: $("#noteTextArea").val()
        }
    }).then(function (data) {
        console.log(data);

    });
    // emtpy and hide the form
    $("#titleInput").val("");
    $("#noteTextArea").val("");
    $(".form-group").hide();
});