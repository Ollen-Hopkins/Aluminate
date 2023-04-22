// Define an empty object to store our data
let myData = [];

function createRecord(data) {
  myData.push(data);
  localStorage.setItem("myData", JSON.stringify(myData));
}

function readRecord(id) {
  return myData[id];
}

function updateRecord(id, data) {
  if (myData[id]) {
    myData[id] = data;
    localStorage.setItem("myData", JSON.stringify(myData));
  }
}

function deleteRecord(id) {
  myData.splice(id, 1);
  localStorage.setItem("myData", JSON.stringify(myData));
}


function register() {
  // form Values
  const name = document.getElementById("name").value;
  const age = document.getElementById("Age").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("user").value;


  const data = {
    name: name,
    age: age,
    email: email,
    username: username,
  };

  createRecord(data);
  console.log(myData);

  window.location.href = "../homePage.html";
}

// On page load, retrieve the data from localStorage
if (localStorage.getItem("myData")) {
  myData = JSON.parse(localStorage.getItem("myData"));
}
