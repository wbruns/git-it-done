var getUserRepos = function(user) {
  // format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  fetch(apiUrl)
  .then(function(response) {
    response.json()
    .then(function(data) {
      console.log(data);
    });
  });
};

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

// on form submission browser event
var formSubmitHandler = function(event) {
  event.preventDefault();
  // get value from input element
  var username = nameInputEl.value.trim();
  // if there is a username
  if (username) {
    getUserRepos(username);
    // clear the input
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
};

// submit event listener
userFormEl.addEventListener("submit", formSubmitHandler);
