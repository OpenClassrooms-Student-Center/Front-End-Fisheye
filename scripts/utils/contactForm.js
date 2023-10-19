async function getInfoPhotographers() {
  const dataPhotographers = await fetch("../../data/photographers.json");
  return dataPhotographers.json();
}

//Dom elements
const modalHeader = document.querySelector(".modal-header");
const title = document.querySelector(".modal-title");
const contactBtn = document.querySelector(".contact-open");

//Display functions

function displayName(photographerId) {
  //HTML
  const namePhotographer = document.createElement("p");
  namePhotographer.innerText = photographerId;
  namePhotographer.className = "photograph-name";

  modalHeader.appendChild(title);
  modalHeader.appendChild(namePhotographer);

  return modalHeader;
}

function displayModal() {
  /*const { photographers } = await getDataPhotographers();*/

  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  getPhotographerName();
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// Template by photographers

//Datas//

async function getPhotographerName() {
  const { photographers } = await getInfoPhotographers();

  displayName(photographers.name);
  console.log(
    "Ce que correspond photographers.name dans displayName :",
    displayName()
  );
}
