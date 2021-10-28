console.log("logic.js")
    //var myData = employeeInfo
var myData = [{
    "ninumber": "ZS502747A",
    "fullname": "Chris P Bacon",
    "phone": "07659-831024",
    "address": "123 Elliot Hill",
    "department": "IT"
}, {
    "ninumber": "XS130502B",
    "fullname": "Miles A Head",
    "phone": "07666-616680",
    "address": "321 Haha Road",
    "department": "Sales"
}, {
    "ninumber": "MY034526D",
    "fullname": "Rick O'Shea",
    "phone": "07440-003065",
    "address": "64 Zoo Lane",
    "department": "HR"
}, {
    "ninumber": "AK311470",
    "fullname": "Robyn Banks",
    "phone": "07342-472921",
    "address": "324 Langton Ridgeway",
    "department": "HR"
}, {
    "ninumber": "LY682275B",
    "fullname": "Lorne Mowers",
    "phone": "07822-821023",
    "address": "234 Julian Market",
    "department": "IT"
}, {
    "ninumber": "BK227215B",
    "fullname": "Frank N Stein",
    "phone": "07661-522545",
    "address": "12 Springfield Grange",
    "department": "Sales"
}, {
    "ninumber": "XB363374C",
    "fullname": "Hedda Hare",
    "phone": "07563-758264",
    "address": "54 Blackbird Crescent",
    "department": "IT"
}, {
    "ninumber": "MY501327A",
    "fullname": "Upton O Goode",
    "phone": "07401-414740",
    "address": "2 St Margarets Drive",
    "department": "IT"
}, {
    "ninumber": "TT405395B",
    "fullname": "Marius Quick",
    "phone": "07870-297789",
    "address": "98 Earl Path",
    "department": "IT"
}, {
    "ninumber": "AZ764036A",
    "fullname": "Max E Mumm",
    "phone": "07872-642897",
    "address": "233 Lady Smith Avenue",
    "department": "IT"
}, {
    "ninumber": "ES73841C",
    "fullname": "Yul B Allwright",
    "phone": "07750-872412",
    "address": "45 Fountains Broadway",
    "department": "Sales"
}, {
    "ninumber": "WX465470A",
    "fullname": "Lori Driver",
    "phone": "07773-782275",
    "address": "65 Burlington Lodge",
    "department": "HR"
}, {
    "ninumber": "AK625470D",
    "fullname": "Shirley U Care",
    "phone": "07569-060117",
    "address": "97 Holderness Drive",
    "department": "HR"
}, {
    "ninumber": "SW098272B",
    "fullname": "Felix Cited",
    "phone": "07394-529507",
    "address": "32 Banningham Court",
    "department": "Sales"
}, {
    "ninumber": "OB043941D",
    "fullname": "Sandy Beech",
    "phone": "07958-301691",
    "address": "3 Third Mount",
    "department": "Sales"
}]


const formAdd = document.getElementById("form-addId");
const formCloseView = document.getElementById("form-closeView");
const formView = document.getElementById("form-view");


let viewBtn = document.querySelector("#view-Btn");

formView.addEventListener('submit', viewEmployee);
formCloseView.addEventListener('submit', closeView);
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

function refreshEmployee() {
    viewEmployee();
    selectEmployee();
    console.log("refreshed");
}

function closeView() {
    document.getElementById("employeeData").innerHTML = ""
}

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
    console.log("edit employee")
    let selectedEmployee = splitWord(document.getElementById("employee2").innerText)
    console.log(selectedEmployee)

    for (i = 0; i < myData.length; i++) {
        if (selectedEmployee == myData[i].ninumber) {
            console.log("before edit")
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

}



function selectEmployee() {
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
    refreshEmployee();
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


}