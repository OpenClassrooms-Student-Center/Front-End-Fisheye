async function getPhotographer() {
  const response = await fetch("data/photographers.json");
  const data = await response.json();
  const photographers = data.photographers;
  const urlParams = new URL(document.location).searchParams;
  const id = urlParams.get("id");
  return photographers.find((photographer) => photographer.id == id);
}

async function displayModal() {
  const photographer = await getPhotographer();
  const modal = document.getElementById("contact_modal");
  const headerModal = document.querySelector(".header_modal");
  const modalTitle = document.createElement("h2");

  modalTitle.innerHTML = `Contactez-moi<br> ${photographer.name}`;
  modalTitle.style.textAlign = "left";
  headerModal.prepend(modalTitle);
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

const contactForm = {
  firstName: document.getElementById("first-name"),
  lastName: document.getElementById("last-name"),
  email: document.getElementById("email"),
  message: document.getElementById("message"),
};

function checkForm() {}

function resetForm() {
  Object.keys(contactForm).forEach((key) => {
    contactForm[key].value = "";
  });
}

function submitForm() {
  const form = {
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };
  console.log("Form submitted", form);
}

const contact_button = document.querySelector(".submit_button");
contact_button.addEventListener("click", (event) => {
  event.preventDefault();
  submitForm();
  resetForm();
});
