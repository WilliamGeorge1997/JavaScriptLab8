document.addEventListener("DOMContentLoaded", function () {
  fetch("https://reqres.in/api/users?page=2")
    .then((response) => response.json())
    .then((data) => {
      let users = data.data;
      let userDataDiv = document.getElementById("container");
      users.forEach((user) => {
        userDataDiv.innerHTML += `
          <div id="user">
            <img src="${user.avatar}" alt="User Image">
            <a href="mailto:${user.email}">${user.email}</a>
          </div>
        `;
      });
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
});
