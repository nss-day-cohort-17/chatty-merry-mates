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

// Wait for JSON file to load, then load messages into HTML
var JSONRequest = new XMLHttpRequest()
JSONRequest.addEventListener("load", loadInitialMessages)
JSONRequest.open("GET", "messages.json")
JSONRequest.send()



// What input does this function need?
var deleteMessage = function() {
  console.log("The delete button was pressed")
}


// Function to load initial messages from JSON file
// Generates list items to add to UL element already in HTML
function loadInitialMessages(loadEvt) {
  var data = JSON.parse(loadEvt.target.responseText)
  var HTMLString = ""
  for(var i = 0; i < data.messages.length; i++) {
    HTMLString +=
    `
    <li>${data.messages[i].message}<button class="btn btn-default delete-btn">Delete</button></li>
    `
  }
  document.getElementById('messages-list').innerHTML = HTMLString
  console.log("Initial messages were loaded")
}
