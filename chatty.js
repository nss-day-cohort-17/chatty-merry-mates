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
function deleteMessage() {
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

// Clear messages
function clearMessages() {
  console.log("The clear message button was pressed")
}

// Change attribute of div element upon user selection of theme checkbox
// Executed when checkbox for dark theme is pressed
// Changes class attribute of div#theme to class="dark-theme" or class="light-theme"
function changeTheme () {

}

// Change the classList for theme div element
function enlargeText() {

}

// adds attribute disabled="disabled" to button
function disableClearButton() {

}

// Executes when enter button is pressed in text field
// Takes text and creates new list item with that text
function addMessage(clickEvt) {

}

// //This is how you add and remove class names
// document.getElementById('theme').classList.add("Leroy-Jenkins")
// document.getElementById('theme').classList.remove("light-theme")








