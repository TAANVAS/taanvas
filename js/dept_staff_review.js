Parse.initialize("erMai5U9yDcuMfH47yV3DBkzK5DJu9nLtfuM4VLm", "F5sG1HntHNFByrRpHmzJXylHE1e9PJHBAiqOhNCx");
Parse.serverURL = "https://parseapi.back4app.com/";

const currentUser = Parse.User.current();

if (currentUser) {    

} else {
    //location.href = 'login.html';
    console.log("NOT LOGGED IN!")
}


var Users = Parse.Object.extend("User");
var Reports = Parse.Object.extend("Report");
var Courses = Parse.Object.extend("Course");
var Applications = Parse.Object.extend("Application");

$(document).ready(function() {
    $('.js-example-basic-multiple').select2({
        placeholder: 'Select options',
        allowClear: true,
        width: '100%'
    });
});

var loading = false

var rowCopy = firstRow.cloneNode(true);

document.getElementById('appIDInput').addEventListener('input', function(event) {
    if (loading) {return}
    loading = true
    // Code to execute whenever input is changed
    var table = document.getElementById('appTable')

    
    table.innerHTML = ''
    
    
    
    var newRow = table.insertRow();
    // Create new cells
    var nameCell = newRow.insertCell(0);
    nameCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300', 'text-center', 'text-white', 'bg-blue-950');
    nameCell.textContent = "Application Name"
    var zNumberCell = newRow.insertCell(1);
    zNumberCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300', 'text-center', 'text-white', 'bg-blue-950');
    zNumberCell.textContent = "Z-Number"
    var cvCell = newRow.insertCell(2);
    cvCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300', 'text-center', 'text-white', 'bg-blue-950');
    cvCell.textContent = "CV"
    var crnCell = newRow.insertCell(3);
    crnCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300', 'text-center', 'text-white', 'bg-blue-950');
    crnCell.textContent = "Applied Date"
    var idCell = newRow.insertCell(4);
    idCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300', 'text-center', 'text-white', 'bg-blue-950');
    idCell.textContent = "Relevant Courses"
    var termCell = newRow.insertCell(5);
    termCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300', 'text-center', 'text-white', 'bg-blue-950');
    termCell.textContent = "Qualified Courses"
    var delCell = newRow.insertCell(6);
    delCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300', 'text-center', 'text-white', 'bg-blue-950');
    delCell.textContent = "Recommend Course"
    var delCell = newRow.insertCell(7);
    delCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300', 'text-center', 'text-white', 'bg-blue-950');
    delCell.textContent = "Accept/Deny";
    
    console.log('Input changed:', event.target.value.toUpperCase());
    userQuery = new Parse.Query(Users);
    
    userQuery.contains("Znumber", event.target.value.toUpperCase());

    userQuery.find().then(function(firstResults) {
        firstResults.forEach(function(firstResult) {
            console.log(firstResult)
            console.log(firstResult.get("username"));
            appQuery = new Parse.Query(Applications);

            appQuery.contains("User", String(firstResult.id));

            appQuery.find().then(function(results) {
                // Loop through each object in the results array
                results.forEach(function(result) {
                    console.log("well, we got this far...")
                    // Object with the specific ZNumber found
                    console.log(firstResult.username);

                    
                    // Find the first row and clone it
                    var firstRow = document.getElementById('firstRow');
                    var newRow = rowCopy.cloneNode(true); // true to clone all descendants as well

                    // Get all the cells in the cloned row
                    var cells = newRow.querySelectorAll('td');

                    // Fill each cell with corresponding data
                    cells[0].textContent = firstResult.get("username")
                    cells[1].textContent = firstResult.get("Znumber")
                    
                    if (result.get("createdAt")) {
                        var formattedDate = result.get("createdAt").toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true });
                        cells[2].textContent = formattedDate;
                    }
                    
                    if (result.get("CV")) {
                        // Assuming 'fileLink' contains the URL of the PDF file
                        var fileLink = result.get("CV")._url;
                        // Create an anchor element
                        var linkElement = document.createElement('a');
                        // Set the href attribute to the URL of the PDF file
                        linkElement.setAttribute('href', fileLink);
                        linkElement.style.textDecoration = "underline";
                        linkElement.style.color = "blue"; // Adjust the color as needed
                        linkElement.setAttribute('target', '_blank');
                        linkElement.classList.add('text-center');
                        // Set the text content to "CV.pdf"
                        linkElement.textContent = "CV.pdf";
                        // Append the link
                        cells[3].textContent = ""
                        cells[3].appendChild(linkElement);
                    } else {
                        cells[3].textContent = "N/A"
                    }
                    
                    cells[4].textContent = result.get("RelevantCourses")
                    if (result.get("QualifiedCourses")) {
                        cells[5].textContent = result.get("QualifiedCourses").join(", ");
                    }
                    
                    // SELECT ELEMENT
                    courseQuery = new Parse.Query(Courses);
                    courseQuery.find().then(function(courseResults) {
                        var selectElement = cells[6].querySelector('select');
                        // Define the options you want to insert
                        var options = courseResults.map(function(course) {
                            return { text: course.get('CourseID'), value: course.id };
                        });

                        // Construct the HTML string for options
                        var optionsHTML = '';
                        options.forEach(function(option) {
                            optionsHTML += '<option value="' + option.value + '">' + option.text + '</option>';
                        });

                        // Set the inner HTML of the select element
                        selectElement.innerHTML = optionsHTML;
                    });
                    
                    // Make the cloned row visible
                    newRow.removeAttribute('hidden');

                    // Append the cloned row to the table's tbody
                    var tbody = document.querySelector('#appTable tbody');
                    tbody.appendChild(newRow);
                    
                    $(document).ready(function() {
                        $('.js-example-basic-multiple').each(function() {
                            $(this).select2({
                                placeholder: 'Select options',
                                allowClear: true,
                                width: '100%'
                            });
                        });
                    });
                });
            });
        });
    });
            
    setTimeout(function() {
        loading = false;
    }, 100); // Adjust the debounce time as needed
});

var event = new Event('input');

// Dispatch the event
appIDInput.dispatchEvent(event);