const openBtn = document.getElementById("contact_btn");
const closeBtn = document.getElementById("close_btn");

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

openBtn.addEventListener("click", displayModal);
closeBtn.addEventListener("click", closeModal);

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
export { displayModal, closeModal };
