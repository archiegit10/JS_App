console.log("logic.js")
var myData = employeeInfo
console.log(myData)

document.getElementById("json").innerHTML = JSON.stringify(myData)

const formAdd = document.getElementById("form-addId");
formAdd.addEventListener("submit", addEmployee);

function refreshEmployee() {

}

function addEmployee() {
    let niValue = document.getElementById("ni").value;
    let nameValue = document.getElementById("name").value;
    let phoneValue = document.getElementById("phone").value;
    let addressValue = document.getElementById("address").value;
    let departmentValue = document.getElementById("department").value;

    const newEmployee = {
        "ninumber": niValue,
        "fullname": nameValue,
        "phone": phoneValue,
        "address": addressValue,
        "department": departmentValue
    }
    myData.push(newEmployee)
    console.log(myData.length)
}

for (i in myData) {
    console.log(myData[i])
}