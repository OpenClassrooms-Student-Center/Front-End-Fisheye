function displayModal() {
  const main = document.getElementById("main");
  const modal = document.getElementById("contact_modal");
  main.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");
  modal.style.display = "block";
  document.getElementById("prenom").focus();
}
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

function closeModal() {
  const main = document.getElementById("main");
  const modal = document.getElementById("contact_modal");
  main.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "true");
  modal.style.display = "none";
  const openBtn = document.getElementById("contact_btn");
  openBtn.focus();
}

function addModalListeners() {
  const openBtn = document.getElementById("contact_btn");
  openBtn.addEventListener("click", displayModal);

  const closeBtn = document.getElementById("close_btn");
  closeBtn.addEventListener("click", closeModal);
}

function validateForm(event) {
  event.preventDefault();

  const firstname = document.getElementById("prenom");
  const lastname = document.getElementById("nom");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  console.log("Prénom:", firstname.value);
  console.log("Nom:", lastname.value);
  console.log("Email:", email.value);
  console.log("Message:", message.value);

  validationMessage();
}

document.getElementById("submit_btn").addEventListener("click", validateForm);

function validationMessage() {
  console.log("formulaire envoyé");
  // reset form
  document.getElementById("Form_modal").reset();
}
export { displayModal, closeModal, addModalListeners };
