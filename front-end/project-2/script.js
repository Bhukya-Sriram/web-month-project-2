const container = document.querySelector(".container");
const input = document.querySelector(".input");

let usersArray = [];

const createCardList = (array) => {
  container.innerHTML = "";

  array.forEach((obj) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `<div class="name">Name</div><div class="name-content">${obj.username}</div><div class="email">Email</div><div class="email-content">${obj.email}</div>`;
    container.appendChild(card);
  });
};

const url = "http://localhost:8000";

const fetchFromServer = () => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      usersArray = data;
      createCardList(usersArray);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
};

fetchFromServer();

input.addEventListener("input", (event) => {
  const searchStr = event.target.value.toLowerCase();

  const filteredArray = usersArray.filter((ele) => {
    return (
      ele.username.toLowerCase().includes(searchStr) ||
      ele.email.toLowerCase().includes(searchStr)
    );
  });

  createCardList(filteredArray);
});

const addUserButton = document.querySelector(".controls img");

addUserButton.addEventListener("click", () => {
  const username = prompt("Enter your username");
  const email = prompt("Enter your email");

  const newUser = {
    username,
    email,
  };

  // Assuming your backend expects a 'secretKey', adjust accordingly
  const secretKey = prompt("Enter secret key");

  const bodyData = {
    newUser,
    secretKey,
  };

  fetch(`${url}/adddata`, {
    method: "POST",
    body: JSON.stringify(bodyData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((result) => {
      usersArray = result;
      createCardList(result);
    })
    .catch((error) => {
      alert("User not added");
      console.error(error);
      
    });
});


particlesJS.load("particles-js","particles.json");