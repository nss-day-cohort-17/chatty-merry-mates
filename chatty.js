/////////////////////////////
/////  Functions        /////
/////////////////////////////


/////////////////////////////
/////  How Edit Works   /////
/////////////////////////////

// upon click of edit button, beginEditProcess fires
  // Global boolean stores if we are in edit mode or not
  // Function saves id of message it came from
  // When enter is pressed, check to see if we are in edit mode
    // Function whenEnterIsPressed
      // If we are in edit mode, edit message and change global boolean
      // If not in edit mode, add message
  // What happens when they delete the entire message?
  // What happens if they want to exit edit mode?

// additional: display message that we are in edit mode?
// addiitonal: highlight message that is being edited?



var messageIdCounter = 0;
var editMessageId;
// Keeps track of if we're in edit mode or not
var editMode = false;

// Function to load initial messages from JSON file
// Generates list items to add to UL element already in HTML
function loadInitialMessages(loadEvt) {
  var data = JSON.parse(loadEvt.target.responseText)
  var HTMLString = ""
  for(var i = 0; i < data.messages.length; i++) {
    HTMLString +=
    `<li id="${messageIdCounter}"><span>${data.messages[i].message}</span>
    <input type="button" value ="Edit" class="btn edit-btn"></input>
    <input type="button" value ="Delete" class="btn delete-btn"></input>
    </li>`
    messageIdCounter += 1
  }
  document.getElementById('messages-list').innerHTML = HTMLString
}

// Executed on click of element with class 'delete-btn'
function deleteMessage(clickEvt) {
  // li is parent element of delete button
  var li = clickEvt.target.parentElement
  // If ID of message being deleted = editmessage id
  if(li.id === editMessageId) {
    editMode = false;
    document.getElementById('inputMessage').value = ""
  }

  li.remove()
  var ul = document.getElementById('messages-list')
  // If no more messages, disable clear messages button
  if(ul.childElementCount === 0) {
    disableClearMessagesButton()
  }
}

// Executed on click of element with class 'edit-btn'
function beginEditProcess(clickEvt) {
  var li = clickEvt.target.parentElement
  var span = li.firstChild
  var messageContent = span.innerText
  editMessageId = li.id
  editMode = true;
  document.getElementById('inputMessage').value = messageContent
  removeEditingLabels()
  span.classList.add("editing")
}

// Remove class='editing' from all spans
function removeEditingLabels() {
  var ul = document.getElementById('messages-list')
  for (var i = 0; i < ul.childElementCount; i++) {
    ul.childNodes[i].firstChild.classList.remove("editing")
  }
}


// Clear messages
function clearAllMessages() {
  // This function should disable the button upon executing
  var ul = document.getElementById('messages-list')
  ul.innerHTML = ""
  disableClearMessagesButton()
}

// adds attribute disabled="true" to button
// When there are no list items
function disableClearMessagesButton() {
  document.getElementById('clearButton').setAttribute("disabled", true)
}

// removes attribute disabled when executed
// no error if disabled attribute does not exist
function enableClearMessagesButton() {
  document.getElementById('clearButton').removeAttribute("disabled")
}

// Executes when enter button is pressed in text field
// Takes text and creates new list item with that text
function whenEnterIsPressed(keyEvt) {
  if (keyEvt.key === "Enter") {
    if(editMode === true) {
      editMessage(keyEvt)

    }
    else {
      addMessage(keyEvt)
    }
  }
}

function addMessage(keyEvt) {
  if(document.getElementById('inputMessage').value != "") {
      document.getElementById('messages-list').innerHTML +=
      `<li id="${messageIdCounter}"><span>${keyEvt.target.value}</span>
      <input type="button" value ="Edit" class="btn edit-btn"></input>
      <input type="button" value ="Delete" class="btn delete-btn"></input>
      </li>`
      messageIdCounter = messageIdCounter + 1
      // Clear input field
      document.getElementById('inputMessage').value = ""
      enableClearMessagesButton();
    }
  var ul = document.getElementById('messages-list')
  // If no more messages, disable clear messages button
  console.dir(ul.childElementCount)
  console.dir(ul.firstChild)
  if(ul.childElementCount > 20) {
    ul.firstChild.remove();
  }
}

function editMessage(keyEvt) {
  if(document.getElementById('inputMessage').value != "") {
    var li = document.getElementById(editMessageId)
    li.firstChild.textContent = keyEvt.target.value
    document.getElementById('inputMessage').value = ""
    editMode = false;
    removeEditingLabels()
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

  // Handle the click event on any DOM element with a certain class
  // Any element with the class "delete-btn" in its class list will call
  // function delete message
  if (event.target.classList.contains("delete-btn")) {
    deleteMessage(event);
  }

  if (event.target.classList.contains("edit-btn")) {
    beginEditProcess(event);
  }

});


document.getElementById('inputMessage').addEventListener('keypress', whenEnterIsPressed)
document.getElementById('clearButton').addEventListener('click', clearAllMessages)
document.getElementById('darkThemeCheckbox').addEventListener('click', toggleTheme)
document.getElementById('largeTextCheckbox').addEventListener('click', toggleEnlargeText)







