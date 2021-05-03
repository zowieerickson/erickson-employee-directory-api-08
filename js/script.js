let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const searchBar = document.querySelector("#searchBar");

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

// Employee Info

function displayEmployees(employeeData) {
  employees = employeeData;

  // store the employee HTML as it's created
  let employeeHTML = "";

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
  });
  gridContainer.innerHTML = employeeHTML;
}

// Modal Window
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
  </div>
  `;
  console.log(street);
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
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

// -------------------------------------
// POST FUNCTIONS
// -------------------------------------
