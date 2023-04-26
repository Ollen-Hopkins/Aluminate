const URL = "https://aluminate-social-clone-default-rtdb.firebaseio.com/";
const EXT = ".json";
fetch(`${URL}${EXT}`)
  .then((res) => res.json())
  .then((data) => console.log(data));

let myData = {};

function createRecord(data) {
  const id = Object.keys(myData).length + 1;
  myData[id] = data;
  localStorage.setItem("myData", JSON.stringify(myData));

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

//New Users Section

function register() {
  // form Values
  const name = document.getElementById("name").value;
  const age = document.getElementById("Age").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("user").value;
  const password = document.getElementById("password").value;

  const data = {
    name: name,
    age: age,
    email: email,
    username: username,
  };

  if (name === "") {
    alert("name must not be empty.");
  } else if (typeof name != "string") {
    alert("name must not be a number.");
  } else if (age < 13) {
    alert("Request parent/guardian permission to access this app.");
  } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    alert("must be a valid email.");
  } else if (username.length < 6) {
    alert("username must be at least 6 characters long.");
  } else if (password.length < 10) {
    alert("password must be at least 10 characters long.");
  } else {
    createRecord(data);
    setTimeout(() => {
      window.location.href = "../homePage.html";
    }, 1000);
  }

  console.log(myData);
}

// 
function loginForm() {
  const username = document.getElementById("user").value;
  const password = document.getElementById("password").value;

  fetch(`${URL}${EXT}`)
    .then((res) => res.json())
    .then((data) => {
      const user = Object.values(data).find(
        (user) => user.username === username
      );

      if (!user) {
        alert("Invalid username");
      } else if (password.length < 10) {
        alert("password must be at least 10 characters long.");
      } else {
        window.location.href = "../homePage.html";
      }
    });
}


// Post Section
 function createPost(imageUrl) {
  let myData = JSON.parse(localStorage.getItem("myData")) || {};
  myData["new_post"] = imageUrl;
  localStorage.setItem("myData", JSON.stringify(myData));
  // Send updated myData object to server
  fetch(`${URL}${EXT}`, {
    method: "PUT",
    body: JSON.stringify(myData),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function handleImageUpload() {
  const input = document.getElementById("formFile");
  const file = input.files[0];
  // converts file to a URL
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = function() {
      const imageUrl = reader.result;
      createPost(imageUrl);
      const img = document.getElementById("newImage");
      img.src = imageUrl;
  }
}