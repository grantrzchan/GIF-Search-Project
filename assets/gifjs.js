//Ready document
$(document).ready();
// Define variables to use
var gifArray = [];
var inputArray = ["dog", "cat", "horse"];
var userInput = "";


//Render pre-existing button function
function renderButtons() {

	var btnArray = [];
        for(i=0;i<inputArray.length;i++){
          var newBtn = $("<button>" + inputArray[i]+"</button>");
        newBtn.attr("class","btn btn-primary");
        newBtn.attr("type","button");
        btnArray.push(newBtn);
        }
  $("#buttonbox").html(btnArray);
      }

renderButtons();

//On click submit button, add search input
$("#addgifgenre").on("click",function(event){
// Need this line to prevent submission from refreshing page
        event.preventDefault();

		userInput = $("#searchinput").val(); 
        inputArray.push(userInput);

        //render all buttons
        renderButtons();
})

//queryURL = giphy url + api

//Call API
 // $.ajax({
        
 //      url: queryURL,
 //      method: "GET"
 //    }).done(function(response) {
 //      console.log(response);
 //     	});
