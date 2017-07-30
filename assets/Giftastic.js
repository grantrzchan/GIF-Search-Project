//Ready document
$(document).ready();

// Define variables to use
var gifArray = ["dog", "cat", "horse"];
var userInput = "";
var apiKey = "adabff6889964147bf2db0e81cea3344";
$(".addedGif").empty();

//Render pre-existing button function

function renderButtons() {

    var btnArray = [];
    for (i = 0; i < gifArray.length; i++) {
        var newBtn = $("<button>" + gifArray[i] + "</button>");
        newBtn.attr("class", "btn btn-primary");
        newBtn.attr("type", "button");
        btnArray.push(newBtn);
    }
    $("#buttonbox").html(btnArray);
}
// Pre-render buttons
renderButtons();

// Call API
function GifCall(number) {
    console.log(userInput);
    var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + userInput + "&limit=" + number;
    // Get gif via AJAX
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        // console.log(response);
        //Give each gif obtained attributes with for loop
        for (i = 0; i < (number - 1); i++) {

            //Assign inputImage as the variable for the img html tag
            var inputImage = $("<img>");

            var imageUrl = response.data[i].images.fixed_height.url;
            var moveGif = response.data[i].images.fixed_height.url;
            var stopGif = response.data[i].images.fixed_height_still.url;

            //Add the modifiers (attributes) "src", "alt", "data-still" and "data-animate"
            $(inputImage).attr({
                src: imageUrl,
                alt: userInput + "image",
                class: "addedGif",
                "data-state": "still",
                "data-still": stopGif,
                "data-animate": moveGif
            });
            // $(inputImage).attr("data-state","still");
            // $(inputImage).attr("data-still",stopGif);
            // $(inputImage).attr("data-animate",moveGif);


            //append gifs. Most recent gifs will appear on top/on the left.
            $("#gifbox").prepend(inputImage);
            //Line break after every 3 gifs
            if ((i + 1) % 3 === 0) {
                $("#gifbox").prepend("<br>");
            }

        }
    });

}


//On click submit button, add search input
$("#addgifgenre").on("click", function(event) {
    // Need this line to prevent submission from refreshing page
    event.preventDefault();
    userInput = $("#searchinput").val().trim();
    gifArray.push(userInput);
    // Search for 9 gifs so that we can display them in a 3x3 grid   
    GifCall(9);

    //render all buttons
    renderButtons();
});


//On click animate/stop gif
$(".addedGif").on("click", function(event) {
    event.preventDefault();
    if ($(this).attr("data-state") === "still") {
        $(this).attr({
            "data-state": "animate",
            src: $(this).attr("data-animate")
        });
        // $(this).attr("data-state","animate");
        // $(this).attr("src", $(this).attr("data-animate"));
    } else {
        $(this).attr({
            "data-state": "still",
            src: $(this).attr("data-still")
        });
        // $(this).attr("data-state","still");
        // $(this).attr("src", $(this).attr("data-still"));
    }

});

//include on click functionality to search items that have been rendered in buttons
$(".btn").on("click", function() {
    userInput = $(this).html();
    $(".addedGif").empty();
    // console.log(userInput);
    GifCall(9);
});

//Error messages if search term already exists
// function ErrorCheck() {
//     for (i = 0; i < gifArray.length; i++) {
//         if (userInput === gifArray[i]) {
//             // open modal for duplicate
//             $(function() {
//                 $("#DupModal").dialog({
//                     modal: true,
//                     buttons: {
//                         Ok: function() {
//                             $(this).dialog("close");
//                         }
//                     }
//                 });
//             });
//         } else if (userInput === "") {
//             // open modal for empty
//             $(function() {
//                 $("#EmpModal").dialog({
//                     modal: true,
//                     buttons: {
//                         Ok: function() {
//                             $(this).dialog("close");
//                         }
//                     }
//                 });
//             });
//         }
//     }
// }


// ErrorCheck();