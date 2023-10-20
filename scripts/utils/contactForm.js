async function getInfoPhotographers() {
  const dataPhotographers = await fetch("../../data/photographers.json");
  return dataPhotographers.json();
}

//Dom elements
const modalHeader = document.querySelector(".modal-header");
const title = document.querySelector(".modal-title");
const closeModalBtn = document.querySelector(".close-modal");
const contactBtn = document.querySelector(".contact-open");

//Display functions

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

  const param = new URLSearchParams(document.location.search);
  const id = param.get("id");
  let photographer;

  if (!id) {
    console.error("missing id parameter");
    return;
  }

  for (let i = 0; i < photographers.length; i++) {
    if (photographers[i].id == id) {
      photographer = photographers[i];
    }
  }

  const container = document.createElement("div");
  container.className = "container-contact";

  const namePhotographer = document.createElement("p");
  namePhotographer.innerText = photographer.name;
  namePhotographer.className = "contact-photograph-name";

  modalHeader.appendChild(container);
  container.appendChild(title);
  container.appendChild(namePhotographer);
  modalHeader.appendChild(closeModalBtn);

  return modalHeader;
}
