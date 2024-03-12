Parse.initialize("erMai5U9yDcuMfH47yV3DBkzK5DJu9nLtfuM4VLm", "F5sG1HntHNFByrRpHmzJXylHE1e9PJHBAiqOhNCx");
Parse.serverURL = "https://parseapi.back4app.com/";

const currentUser = Parse.User.current();

if (currentUser) {    
    document.getElementById("username").innerHTML = currentUser.getUsername()
    currentUsername = currentUser.getUsername()
} else {
    //location.href = 'login.html';
    console.log("NOT LOGGED IN!")
}


var Posts = Parse.Object.extend("User");


var postNum = 0
query = new Parse.Query(Posts);

function loadPosts(numPosts) {
    // Create a URLSearchParams object from the URL
    var urlParams = new URLSearchParams(window.location.search);

    // Get the value of the 'id' parameter from the URL
    var username = urlParams.get('username');
    
    console.log(username)
    
    query.equalTo('username', username);
    query.first().then(function(result) {
      if (result) {
          
        var table = document.getElementById('appTable')

        // Create a new row
        var newRow = table.insertRow();

        // Create new cells
        var nameCell = newRow.insertCell(0);
        nameCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300');
        var appliedDateCell = newRow.insertCell(1);
        appliedDateCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300');
        var CVCell = newRow.insertCell(2);
        CVCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300');
        var recommendCell = newRow.insertCell(3);
        recommendCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300');
        var requestedCell = newRow.insertCell(4);
        requestedCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300');
        var pastCell = newRow.insertCell(5);
        pastCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300');
        var acceptCell = newRow.insertCell(6);
        acceptCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300');
          
        // Set the cell content
        nameCell.textContent = result.get("username");
        
        if (result.get("appliedDate")) {
            var formattedDate = result.get("appliedDate").toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true });
            appliedDateCell.textContent = formattedDate;
        }

        // Assuming 'fileLink' contains the URL of the PDF file
        var fileLink = result.get("CV")._url;
        // Create an anchor element
        var linkElement = document.createElement('a');
        // Set the href attribute to the URL of the PDF file
        linkElement.setAttribute('href', fileLink);
        linkElement.style.textDecoration = "underline";
        linkElement.style.color = "blue"; // Adjust the color as needed
        linkElement.setAttribute('target', '_blank');
        // Set the text content to "CV.pdf"
        linkElement.textContent = "CV.pdf";
        // Append the link
        CVCell.appendChild(linkElement);
          
        recommendCell.textContent = result.get("requestedClasses");
        requestedCell.textContent = result.get("recommendedClasses");
        pastCell.textContent = result.get("pastClasses");
        
        
        var acceptButton = document.createElement('button');
        acceptButton.textContent = 'Accept';
        acceptButton.classList.add('acceptButton', 'px-4', 'py-2', 'bg-green-500', 'text-white', 'rounded');
        acceptCell.appendChild(acceptButton)
          
        acceptButton.addEventListener('click', function() {
            acceptButton.textContent = "Accepted";
            const relatedDenyButton = acceptButton.parentElement.querySelector('.denyButton');
            if (relatedDenyButton) {
                relatedDenyButton.style.display = 'none';
            }
        });
          
        // Add a space between buttons
        acceptCell.appendChild(document.createTextNode('\u00A0'));
          
        // Create the deny button
        var denyButton = document.createElement('button');
        denyButton.textContent = 'Deny';
        denyButton.classList.add('denyButton', 'px-4', 'py-2', 'bg-red-500', 'text-white', 'rounded');
        acceptCell.appendChild(denyButton)
        
        denyButton.addEventListener('click', function() {
            denyButton.textContent = "Denied";
            const relatedAcceptButton = denyButton.parentElement.querySelector('.acceptButton');
            if (relatedAcceptButton) {
                relatedAcceptButton.style.display = 'none';
            }
        });

        
        
      } else {
        console.log('No results found.');
      }
    }).catch(function(error) {
      console.error('Error:', error);
    });
}

loadPosts(5);