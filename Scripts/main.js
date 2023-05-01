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
    localStorage.setItem("username", username);
    setTimeout(() => {
      window.location.href = "homepage.html";
      setUsername();
    }, 1000);
  }

  console.log(myData);
}

function loginForm() {
  const username = document.getElementById("user").value;
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    fetch(`${URL}${EXT}`)
      .then((res) => res.json())
      .then((data) => {
        const user = Object.values(data).find(
          (user) => user.username === username
        );
        if (user) {
          setTimeout(() => {
            window.location.href = "homepage.html";
            setUsername();
          }, 1000);
        } else {
          alert("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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

function imageUpload() {
  const input = document.getElementById("formFile");
  const file = input.files[0];
  // converts file to a URL
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = function () {
    const imageUrl = reader.result;
    createPost(imageUrl);
    const img = document.getElementById("newImage");
    img.src = imageUrl;

  };
}

myData = JSON.parse(localStorage.getItem("myData"));
let imageURL = myData.new_post;

const newImage = document.createElement("img");
newImage.src = imageURL;
newImage.classList.add('new-image');
const cardBody = document.querySelector("#card-body");
cardBody.appendChild(newImage);

const currentVideo = document.querySelector("#video");
currentVideo.style.display = "none";



// Homepage Section
function setUsername() {
  const user = localStorage.getItem("username");
  const usernameElement = document.querySelector(".currentUsername");
  if (user) {
    usernameElement.innerHTML = user;
  } else {
    usernameElement.innerHTML = "Guest";
  }
}

window.onload = function () {
  setUsername();
};

//comment Section
function comment() {
  const username = localStorage.getItem("username");
  const newComment = document.getElementById("newUsercomment").value;

  if (myData[username]) {
    myData[username].comment = newComment;
    localStorage.setItem("myData", JSON.stringify(myData));
    fetch(`${URL}${EXT}`, {
      method: "put",
      body: JSON.stringify("myData"),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  } else {
    alert("Username not found");
  }
}

document.getElementById("commentButton").addEventListener("click", function () {
  comment();
});

function deletePost () {
  let deleteButton = document.querySelector('.imageThree');
  
}