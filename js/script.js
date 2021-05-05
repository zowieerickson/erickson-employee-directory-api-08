let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const header = document.querySelector("#main-header");
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const searchBar = document.querySelector("#searchBar");
const leftArrow = document.querySelector("#left-arrow");
const suggestionsPanel = document.querySelector(".suggestions");

// -------------------------------------
// FETCH FUNCTIONS
// -------------------------------------

fetch(urlAPI)
  .then((response) => response.json())
  .then((data) => data.results)
  .then(displayEmployees)
  .catch((err) => console.log(err));

// -------------------------------------
// HELPER FUNCTIONS
// -------------------------------------

// Employee Info ------------------------------------------------------------------------
function displayEmployees(employeeData) {
  employees = employeeData;

  // store the employee HTML as it's created
  let employeeHTML = "";
  const allNames = [];
  // loop through each employee and create HTML markup
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    // add to HTML
    employeeHTML += `
    <div class="card" data-index="${index}">
          <img class="avatar" src="${picture.large}" alt="employee profile picture" />
          <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email t-gray">${email}</p>
            <p class="address t-gray">${city}</p>
          </div>
        </div>
    `;

    allNames.push(name);
    const cards = document.querySelectorAll(".card");
    // console.log(cards);
    const names = document.querySelectorAll(".name");
    console.log(names);
  });
  // console.log(allNames);

  // searchBar.addEventListener("keyup", function () {
  //   const input = searchBar.nodeValue;
  //   const suggestions = allNames.filter(function (name) {
  //     let firstAndLast = `${name.first} ${name.last}`;
  //     return firstAndLast.toLowerCase().startsWith(input);
  //   });
  //   suggestions.forEach(function (suggested) {
  //     const div = document.createElement("div");
  //     div.innerHTML = suggested;
  //     suggestionsPanel.appendChild(div);
  //   });
  // });

  // allNames.forEach((name) => {
  //   let firstAndLast = `${name.first} ${name.last} `;
  //   console.log(firstAndLast);
  // });
  gridContainer.innerHTML = employeeHTML;
}

// Modal Window------------------------------------------------------------------------
function displayModal(index) {
  //Object destructering
  let {
    name,
    dob,
    phone,
    email,
    location: { city, street, state, postcode },
    picture,
  } = employees[index];

  let date = new Date(dob.date);

  const modalHTML = `
  <img
  class="avatar" src="${picture.large}" alt="employee profile picture"/>
  <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email t-gray">${email}</p>
    <p class="address t-gray">${city}</p>
    <hr class="t-gray" />
    <p class="t-gray">${phone}</p>
    <p class="address t-gray">${street.number} ${
    street.name
  }, ${state} ${postcode}</p>
    <p class="t-gray">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    <button id="left-arrow" class="arrow" onclick="prevModal(${index})"><</button>
    <button id="right-arrow" class="arrow" onclick="nextModal(${index})">
      >
    </button>
  </div>
  `;
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}

// Search input -----------------------------------------------------------------------

// Next modal Window ----------------------------------------------------------------

function prevModal(index) {
  let prevIndex = (index -= 1);
  if (prevIndex > -1) {
    displayModal(prevIndex);
  } else {
    displayModal(11);
  }
}

function nextModal(index) {
  let nextIndex = (index += 1);
  if (nextIndex < 12) {
    displayModal(nextIndex);
  } else {
    displayModal(0);
  }
}

// -------------------------------------
// EVENT LISTENERS
// -------------------------------------

gridContainer.addEventListener("click", (e) => {
  // make sure click is not on the gridContainer itself
  if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");

    displayModal(index);
  }
});

modalClose.addEventListener("click", () => {
  overlay.classList.add("hidden");
});
