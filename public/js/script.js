// Hide form on load
$(".form-group").hide();
$("#scrape-btn").hide();

// Show Scrape data button if there are not articles yet.
$.getJSON("/api/article/all", function (data) {
    console.log(data.name);
    if (data.name) {
        $("#scrape-btn").show();
    } else {
        $("#scrape-btn").hide();
    }
});

// Article click event to view Notes
$(".theArticle").on("click", function () {
    let thisID = $(this).attr("data-id");
    $("#saveNote").attr("data-id", thisID);

    $.ajax({
        method: "GET",
        url: "/api/article/" + thisID
    }).then(function (data) {
        // show the form with title
        $(".form-group").show();
        $("#articleTitleForm").text(data.title);

        console.log(data.note);

        // populate form with the data
        if (data.note) {
            $("#titleInput").val(data.note.title);
            $("#noteTextArea").val(data.note.body);
        } else {
            $("#titleInput").val("");
            $("#noteTextArea").val("");
        }
    });

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