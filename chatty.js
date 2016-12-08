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
    <li><span>${data.messages[i].message}</span>
    <input type="button" value ="Edit" class="btn btn-default edit-btn"></input>
    <input type="button" value ="Delete" class="btn btn-default delete-btn"></input>
    </li>
    `
  }
  document.getElementById('messages-list').innerHTML = HTMLString
  console.log("Initial messages were loaded")
}

// Executed on click of element with class 'delete-btn'
function deleteMessage(clickEvt) {
  console.log("The delete button was pressed")
  // li is parent element of delete button
  var li = clickEvt.target.parentElement
  li.remove()
  var ul = document.getElementById('messages-list')
  // If no more messages, disable clear messages button
  if(ul.childElementCount === 0) {
    disableClearMessagesButton()
  }
}

// Executed on click of element with class 'edit-btn'
function editMessage(clickEvt) {
  console.log("Edit Button was pressed")
  var messageContent = clickEvt.target.parentElement.firstChild.innerText
  document.getElementById('inputMessage').value = messageContent
}


// Clear messages
function clearAllMessages() {
  // This function should disable the button upon executing
  console.log("The clear message button was pressed")
  var ul = document.getElementById('messages-list')
  ul.innerHTML = ""
  disableClearMessagesButton()
}

// adds attribute disabled="true" to button
// When there are no list items
function disableClearMessagesButton() {
  console.log("Clear Messages Button disabled")
  document.getElementById('clearButton').setAttribute("disabled", true)
}

// removes attribute disabled when executed
// no error if disabled attribute does not exist
function enableClearMessagesButton() {
  console.log("Clear Messages Button enabled")
  document.getElementById('clearButton').removeAttribute("disabled")
}

// Executes when enter button is pressed in text field
// Takes text and creates new list item with that text
function addMessage(keyEvt) {
  if (keyEvt.key === "Enter") {
  console.log("Enter was pressed")
    if(document.getElementById('inputMessage').value != "") {
      document.getElementById('messages-list').innerHTML +=
      `
      <li><span>${keyEvt.target.value}</span>
      <input type="button" value ="Edit" class="btn btn-default edit-btn"></input>
      <input type="button" value ="Delete" class="btn btn-default delete-btn"></input>
      </li>
      `
      // Clear input field
      document.getElementById('inputMessage').value = ""
      enableClearMessagesButton();
    }
  }
}

// Change attribute of div element upon user selection of theme checkbox
// Executed when checkbox for dark theme is pressed
// Changes class attribute of div#theme to class="dark-theme" or class="light-theme"
function toggleTheme () {
  document.getElementById('theme').classList.toggle("dark-theme")
}

// Change the classList for theme div element
function toggleEnlargeText() {
  document.getElementById('theme').classList.toggle("large-text")
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
  if (event.target.classList.contains("delete-btn")) {
    deleteMessage(event);
  }

  if (event.target.classList.contains("edit-btn")) {
    editMessage(event);
  }

});


document.getElementById('inputMessage').addEventListener('keypress', addMessage)
document.getElementById('clearButton').addEventListener('click', clearAllMessages)
document.getElementById('darkThemeCheckbox').addEventListener('click', toggleTheme)
document.getElementById('largeTextCheckbox').addEventListener('click', toggleEnlargeText)







