const userDataAPI = {
  newUsers: [
    {
      id: 1,
      age: 21,
      fullName: "John",
      email: "john@example.com",
      username: "username",
      password: "password",
    },
  ],
  oldUsers: [
    {
      id: 1,
      username: "Wukong_is_king",
      password: "sad",
    },
  ],
  getOldUserById: async function (id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.oldUsers[id]);
      }, 1000);
    });
  },
  getNewUsersById: async function (id) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const newUser = this.newUsers.find((user) => user.id === id);
        if (newUser) {
          res(newUser);
        } else {
          rej(new Error(`user ${newUser.username} not found`));
        }
      }, 1000);
    });
  },
  createNewUserById: async function (newUser) {
    return new Promise((res) => {
      setTimeout(() => {
        const registerUser = { ...newUser, id: this.newUsers.length + 1 };
        this.newUsers.push(registerUser);
        res(registerUser);
      }, 1000);
    });
  },
  updateUsersById: async function (id, updates) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const newUserIndex = this.newUsers.findIndex((user) => user.id === id);
        const oldUserIndex = this.oldUsers.findIndex(
          (oldUser) => oldUser.id === id
        );
        if (newUserIndex >= 0) {
          const updateNewUser = { ...this.newUsers[newUserIndex], ...updates };
          this.newUsers[newUserIndex] = updateNewUser;
          res(updateNewUser);
        } else {
          rej(new Error(`user ${newUser.username} not found`));
        }
        if (oldUserIndex >= 0) {
          const updateoldUser = { ...this.oldUsers[oldUserIndex], ...updates };
          this.oldUsers[oldUserIndex] = updateoldUser;
          res(updateoldUser);
        } else {
          rej(new Error(`user not found`));
        }
      }, 1000);
    });
  },
  deleteUsersById: async function () {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const newUserIndex = this.newUsers.findIndex((user) => user.id === id);
        const oldUserIndex = this.oldUsers.findIndex(
          (oldUser) => oldUser.id === id
        );
        if (newUserIndex >= 0) {
          this.newUsers.splice(newUserIndex, 1);
          res();
        } else {
          rej(new Error(`user ${newUser.username} not found`));
        }

        if (oldUserIndex >= 0) {
          this.oldUsers.splice(oldUserIndex, 1);
          res();
        } else {
          rej(new Error(`user not found`));
        }
      }, 1000);
    });
  },
  loginData: function loginformData() {
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.getElementById("user").value;
      const password = document.getElementById("password").value;

      try {
        const user = await userDataAPI.getOldUserById(1);
        if (user.username === username && user.password === password) {
          console.log("Login successful!");
        } else {
          console.log("Invalid username or password!");
        }
      } catch (error) {
        console.log(error.message);
      }
    });
  },
};
