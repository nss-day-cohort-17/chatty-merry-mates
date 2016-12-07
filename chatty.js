/////////////////////////////
////     Objectives     /////
/////////////////////////////


// Adding event listener to body as per helpful hint
// Listening to dynamically created elements
document.querySelector("body").addEventListener("click", function(event) {
  console.log(event);

  // Handle the click event on any DOM element with a certain class
  // Any element with the class "delete-btn" in its class list will call
  // function delete message
  for (var i = 0; i < event.target.classList.length; i++) {
    if (event.target.classList[i] === "delete-btn") {
      deleteMessage();
    }
  }
});


// What input does this function need?
var deleteMessage = function() {
  console.log("The delete button was pressed")
}
