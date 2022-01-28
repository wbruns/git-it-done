// parent element to hold issues
var issueContainerEl = document.querySelector("#issues-container");
// parent element for pagination limit warning
var limitWarningEl = document.querySelector("#limit-warning");
// selecting the header
var repoNameEl = document.querySelector("#repo-name");

var getRepoName = function() {
  // get the query string from url
  var queryString = document.location.search;

  // split string to get 'owner/repo'
  var repoName = queryString.split("=")[1];

  // pass repoName to getRepoIssues
  getRepoIssues(repoName);

  // display repoName in header
  repoNameEl.textContent = repoName;
};

var getRepoIssues = function(repo) {
  // end point for a repo's issues, oldest first
  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

  fetch(apiUrl).then(function(response) {
    // request successful
    if (response.ok) {
      response.json().then(function(data) {
        // pass response data to dom function
        displayIssues(data);

        // check if api has paginated issues
        if (response.headers.get("Link")) {
          displayWarning(repo);
        }
      });
    } else {
      alert("There was a problem with your request!");
    }
  });  
};

var displayIssues = function(issues) {
  // check for 0 issues
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
    return;
  }
  for (var i = 0; i < issues.length; i++) {
    // create a link element to take users to the issue on github
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    // create span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    // append to container
    issueEl.appendChild(titleEl);

    // create a type element
    var typeEl = document.createElement("span");

    // check if issue is an actual issue or a pull request
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull request)";
    } else {
      typeEl.textContent = "(Issue)";
    }
    // append to container
    issueEl.appendChild(typeEl);

    // apend container to page
    issueContainerEl.appendChild(issueEl);
  }
};

// for displaying pagination limit warning
var displayWarning = function(repo) {
  // add text to warning container
  limitWarningEl.textContent = "To see more than 30 issues, visit ";
  
  // create a link element to take users to the full github page of issues
  var linkEl = document.createElement("a");
  linkEl.textContent = "See More Issues on GitHub.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");

  // append to warning container
  limitWarningEl.appendChild(linkEl);
};

getRepoName();