console.log("logic.js")
var myData = employeeInfo

const formView = document.getElementById('form-view');
let viewBtn = document.getElementById("viewBtn");
viewBtn.addEventListener("click", viewEmployee);
let clearBtn = document.getElementById("clearViewBtn");
clearBtn.addEventListener("click", closeView);

const formFilterView = document.getElementById('form-filter');
let formFilter = document.getElementById("viewFilterBtn");
formFilter.addEventListener('click', filterDepartment);


const formAdd = document.getElementById("form-addId");
formAdd.addEventListener('submit', addEmployee);



selectEmployee()

function splitWord(word) {
    var n = word.split(" ");
    return n[n.length - 1]
}

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

function closeView() {
    document.getElementById("employeeData").innerHTML = ""
}

/*
Name; showEmployee Parameter: the selected employee
Purpose; passes the data of the selected employee into the text boxes for editing
*/
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



function editEmployee() {
    let selectedEmployee = splitWord(document.getElementById("employee2").innerText)
    for (i = 0; i < myData.length; i++) {
        if (selectedEmployee == myData[i].ninumber) {
            console.log(myData[i])
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

function clearDropdown() {
    const myNode = document.getElementById("selectEmployee")
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild)
    }
}

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
    console.log(myData.length)
    selectEmployee();
    viewEmployee()
}


function deleteEmployee() {
    console.log("delete employee")
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

function closeFilterView() {
    console.log("close filter")
    document.getElementById("departmentView").innerHTML = ""
}