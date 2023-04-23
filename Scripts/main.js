const URL = "https://aluminate-social-clone-default-rtdb.firebaseio.com/";
const EXT = ".json";
fetch(`${URL}${EXT}`) 
    .then((res) => res.json())
    .then((data) => console.log(data))

let myData = {};

function createRecord(data) {
    const id = Object.keys(myData).length + 1;
    myData[id] = data;
    localStorage.setItem('myData', JSON.stringify(myData));

  fetch(`${URL}${EXT}`, {
    method: "PUT",
    body: JSON.stringify(myData),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function readRecord(id) {
  return myData[id];
}

function updateRecord(id, data) {
  if (myData[id]) {
    myData[id] = data;
    localStorage.setItem("myData", JSON.stringify(myData));
  }

  fetch(`${URL}${EXT}`, {
    method: "PUT",
    body: JSON.stringify(myData),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function deleteRecord(id) {
  myData.splice(id, 1);
  localStorage.setItem("myData", JSON.stringify(myData));

  fetch(`${URL}${EXT}`, {
    method: "PUT",
    body: JSON.stringify(myData),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
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

//   window.location.href = "../homePage.html";
}

