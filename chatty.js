/////////////////////////////
/////  Functions        /////
/////////////////////////////

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

// Executed on click of element with class 'delete-btn'
var clickEvent
function deleteMessage(clickEvt) {
  console.log("The delete button was pressed")
  var li = clickEvt.target.parentElement
  li.remove() // removes li that contained delete button

  var ul = document.getElementById('messages-list')
  // If no more messages, disable clear messages button
  if(ul.childElementCount === 0) {
    disableClearMessagesButton()
  }
}


// Clear messages
function clearAllMessages() {
  // This function should disable the button upon executing
  console.log("The clear message button was pressed")
  var ul = document.getElementById('messages-list')
  ul.innerHTML = ""
}

// adds attribute disabled="disabled" to button
// When there are no list items
function disableClearMessagesButton() {
  console.log("Clear Messages Button disabled")
}

function enableClearMessagesButton() {
  console.log("Clear Messages Button enabled")
}

// Executes when enter button is pressed in text field
// Takes text and creates new list item with that text
function addMessage(keyEvt) {
  if (keyEvt.key === "Enter") {
    console.log("Enter was pressed")
    document.getElementById('messages-list').innerHTML +=
    `<li>${keyEvt.target.value}<button class="btn btn-default delete-btn">Delete</button></li>`
    // Clear input field
    document.getElementById('inputMessage').value = ""
  }
}

// Change attribute of div element upon user selection of theme checkbox
// Executed when checkbox for dark theme is pressed
// Changes class attribute of div#theme to class="dark-theme" or class="light-theme"
function changeTheme () {

}

// Change the classList for theme div element
function enlargeText() {

}



/////////////////////////////
/////  Event Listeners  /////
/////////////////////////////

// Wait for JSON file to load, then load messages into HTML
var JSONRequest = new XMLHttpRequest()
JSONRequest.addEventListener("load", loadInitialMessages)
JSONRequest.open("GET", "messages.json")
JSONRequest.send()

// Adding event listener to body as per helpful hint
// Listening to dynamically created elements
document.querySelector("body").addEventListener("click", function(event) {
  // console.log(event);

  // Handle the click event on any DOM element with a certain class
  // Any element with the class "delete-btn" in its class list will call
  // function delete message
  for (var i = 0; i < event.target.classList.length; i++) {
    if (event.target.classList[i] === "delete-btn") {
      deleteMessage(event);
    }
  }
});

// Listens for keypress on text input field
document.getElementById('inputMessage').addEventListener('keypress', addMessage)
// Listens for clear messages button press
document.getElementById('clearButton').addEventListener('click', clearAllMessages)




// //This is how you toggle
// function toggleClass() {
//   document.getElementById('theme').classList.toggle("Leroy-Jenkins")
// }




