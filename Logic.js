/*
Author: Archie Schneider Ward;
Name: Logic.js
Purpose: Contain the logic and functions for Index.html to work
Functions: selectEmployee, splitWord, viewEmployee, closeView, showEmployee, editEmployee, clearDropdown, addEmployee, deleteEmployee, filterDepartment, closeFilterView
Data: employeeInfo from sampleData.js
*/
// calls the data from sampleData.js
var myData = employeeInfo

//employee view buttons
const formView = document.getElementById('form-view');
let viewBtn = document.getElementById("viewBtn");
viewBtn.addEventListener("click", viewEmployee);
let clearBtn = document.getElementById("clearViewBtn");
clearBtn.addEventListener("click", closeView);
// employee filter view buttons
const formFilterView = document.getElementById('form-filter');
let formFilter = document.getElementById("viewFilterBtn");
formFilter.addEventListener('click', filterDepartment);

// employee add buttons
const formAdd = document.getElementById("form-addId");
formAdd.addEventListener('submit', addEmployee);

// calls the dropdown menu on page load
selectEmployee()

//retrieves the last word in the string, used to split the name and NI number in the dropdown
function splitWord(word) {
    var n = word.split(" ");
    return n[n.length - 1]
}
// creates a table for employees
function viewEmployee() {
    let table = document.createElement("table");
    let col = [];
    for (i = 0; i < myData.length; i++) {
        for (key in myData[i]) {
            if (col.indexOf(key) == -1) {
                col.push(key)
            }
        }
    }
    let tableRow = table.insertRow(-1);
    for (let i = 0; i < col.length; i++) {
        let tableHeader = document.createElement("th")
        tableHeader.innerHTML = col[i];
        tableRow.appendChild(tableHeader);
    }
    for (let i = 0; i < myData.length; i++) {
        tableRow = table.insertRow(-1);
        for (let j = 0; j < col.length; j++) {
            let tabCell = tableRow.insertCell(-1);
            tabCell.innerHTML = myData[i][col[j]];
        }
    }
    let divContainer = document.getElementById("employeeData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}
//sets the view element to empty
function closeView() {
    document.getElementById("employeeData").innerHTML = ""
}

//passes the data of the selected employee into the text boxes for editing
function showEmployee(element) {
    var text = element.options[element.selectedIndex].text;
    document.getElementById("employee").innerHTML = text;
    document.getElementById("employee2").innerHTML = text;
    var niSelection = splitWord(text)
    for (i = 0; i < myData.length; i++) {
        if (niSelection == myData[i]["ninumber"]) {
            document.getElementById("niEdit").value = myData[i]["ninumber"];
            document.getElementById("nameEdit").value = myData[i]["fullname"];
            document.getElementById("phoneEdit").value = myData[i]["phone"];
            document.getElementById("addressEdit").value = myData[i]["address"];
            document.getElementById("departmentEdit").value = myData[i]["department"];
        }
    }
}
//gets the selected employee and allows the edit of that employee
function editEmployee() {
    let selectedEmployee = splitWord(document.getElementById("employee2").innerText)
    for (i = 0; i < myData.length; i++) {
        if (selectedEmployee == myData[i].ninumber) {
            let niValue = document.getElementById("niEdit").value;
            let nameValue = document.getElementById("nameEdit").value;
            let phoneValue = document.getElementById("phoneEdit").value;
            let addressValue = document.getElementById("addressEdit").value;
            let departmentValue = document.getElementById("departmentEdit").value;
            document.getElementById('message').innerHTML = `Edited NI: ${niValue},Name: ${nameValue},Name: ${phoneValue},Name: ${addressValue},Name: ${departmentValue}`
            myData[i] = {
                "ninumber": niValue,
                "fullname": nameValue,
                "phone": phoneValue,
                "address": addressValue,
                "department": departmentValue
            }
        }
    }
    selectEmployee()
    viewEmployee()
}
//fills in the dropdown elements with the employees names and ni number incase duplicate names
function selectEmployee() {
    clearDropdown()
    select = document.getElementById("selectEmployee")
    for (let i = 0; i < myData.length; i++) {
        var opt2 = myData[i]["ninumber"]
        var opt1 = myData[i]["fullname"]
        var opt = opt1 + "    " + opt2
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}
// clears the dropdown by removing the elements children (the options)
function clearDropdown() {
    const myNode = document.getElementById("selectEmployee")
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild)
    }
}
// adds employee and pushes to the array
function addEmployee() {
    let niValue = document.getElementById("ni").value;
    let nameValue = document.getElementById("name").value;
    let phoneValue = document.getElementById("phone").value;
    let addressValue = document.getElementById("address").value;
    let departmentValue = document.getElementById("department").value;
    // ni will be the key
    for (i = 0; i < myData.length; i++) {
        if (niValue == myData[i].ninumber) {
            alert("Please enter a unique national insurance ID")
            return;
        }
    }
    const newEmployee = {
        "ninumber": niValue,
        "fullname": nameValue,
        "phone": phoneValue,
        "address": addressValue,
        "department": departmentValue
    }
    myData.push(newEmployee)
    selectEmployee();
    viewEmployee()
}

// deletes employee by the ni number
function deleteEmployee() {
    var selection = document.getElementById('employee2');
    var textSelection = selection.innerText
    var niSelection = splitWord(textSelection)
    document.getElementById('message').innerHTML = `Deleted ID: ${niSelection}`
    for (i = 0; i < myData.length; i++) {
        if (niSelection == myData[i].ninumber) {
            myData.splice(i, 1);
            return myData;
        }
    }
    selectEmployee()
}
// creates a view of employees where employees work for department specified 
function filterDepartment() {
    let department = document.getElementById("departmentSel").value;
    const departmentArray = []
    for (i = 0; i < myData.length; i++) {
        if (department == myData[i].department) {
            departmentArray.push(myData[i])

        }
    }
    let table = document.createElement("table");
    let col = [];
    for (let i = 0; i < departmentArray.length; i++) {
        for (let key in departmentArray[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    let tableRow = table.insertRow(-1);
    for (let i = 0; i < col.length; i++) {
        let tableHeader = document.createElement("th")
        tableHeader.innerHTML = col[i];
        tableRow.appendChild(tableHeader);
    }
    for (let i = 0; i < departmentArray.length; i++) {
        tableRow = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            let tabCell = tableRow.insertCell(-1);
            tabCell.innerHTML = departmentArray[i][col[j]];
        }
    }
    let divContainer = document.getElementById("departmentView");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}
// closes the filter view
function closeFilterView() {
    document.getElementById("departmentView").innerHTML = ""
}