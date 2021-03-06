// Client ID and API key from the Developer Console
var CLIENT_ID = '266643809945-3stsadk3v733kcdlk4qj0fugegrs3h5v.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBM84ndf0SpFtXRg-mkiQkGi4f2aRTV2rc';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://script.googleapis.com/$discovery/rest?version=v1"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/script.projects';

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    appendPre(JSON.stringify(error, null, 2));
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    callAppsScript();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

/**
 * Shows basic usage of the Apps Script API.
 *
 * Call the Apps Script API to create a new script project, upload files
 * to the project, and log the script's URL to the user.
 */
 function callAppsScript() {
var scriptId = "14DqVwveVm7DW84xpSQsIFeTh4ulrELBicHR-dK5Qsj9DQW-3R-ukgskA";

// Call the Apps Script API run method
//   'scriptId' is the URL parameter that states what script to run
//   'resource' describes the run request body (with the function name
//              to execute)
gapi.client.script.scripts.run({
'scriptId': scriptId,
'resource': {
'function': 'getUser'
}
}).then(function(resp) {
  console.log("a")
var result = resp.result;
if (result.error && result.error.status) {
// The API encountered a problem before the script
// started executing.
appendPre('Error calling API:');
appendPre(JSON.stringify(result, null, 2));
} else if (result.error) {
  console.log("y")
// The API executed, but the script returned an error.

// Extract the first (and only) set of error details.
// The values of this object are the script's 'errorMessage' and
// 'errorType', and an array of stack trace elements.
var error = result.error.details[0];
appendPre('Script error message: ' + error.errorMessage);

if (error.scriptStackTraceElements) {
  // There may not be a stacktrace if the script didn't start
  // executing.
  appendPre('Script error stacktrace:');
  for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
    var trace = error.scriptStackTraceElements[i];
    appendPre('\t' + trace.function + ':' + trace.lineNumber);
  }
}
} else {
// The structure of the result will depend upon what the Apps
// Script function returns. Here, the function returns an Apps
// Script Object with String keys and values, and so the result
// is treated as a JavaScript object (folderSet).

console.log("z")
}
});
}


function geniusPortalInit() {
  var scriptId = "14DqVwveVm7DW84xpSQsIFeTh4ulrELBicHR-dK5Qsj9DQW-3R-ukgskA";
  
  // Call the Apps Script API run method
  //   'scriptId' is the URL parameter that states what script to run
  //   'resource' describes the run request body (with the function name
  //              to execute)
  gapi.client.script.scripts.run({
  'scriptId': scriptId,
  'resource': {
  'function': 'getUserData'
  }
  }).then(function(resp) {
  
  var result = resp.result;
  if (result.error && result.error.status) {
  // The API encountered a problem before the script
  // started executing.
  appendPre('Error calling API:');
  appendPre(JSON.stringify(result, null, 2));
  } else if (result.error) {
  // The API executed, but the script returned an error.
  
  // Extract the first (and only) set of error details.
  // The values of this object are the script's 'errorMessage' and
  // 'errorType', and an array of stack trace elements.
  var error = result.error.details[0];
  appendPre('Script error message: ' + error.errorMessage);
  
  if (error.scriptStackTraceElements) {
    // There may not be a stacktrace if the script didn't start
    // executing.
    appendPre('Script error stacktrace:');
    for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
      var trace = error.scriptStackTraceElements[i];
      appendPre('\t' + trace.function + ':' + trace.lineNumber);
    }
  }
  } else {
  // The structure of the result will depend upon what the Apps
  // Script function returns. Here, the function returns an Apps
  // Script Object with String keys and values, and so the result
  // is treated as a JavaScript object (folderSet).
  
  var folderSet = result.response.result;
console.log(result);
console.log("result2"+result.response.result)
  }
  });
  }

