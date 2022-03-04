const closeBtn = document.querySelector("#contact_modal img");
const submitBtn = document.getElementById("submit_button");
const contactBtn = document.querySelector(".contact_button");
const modalTemp = document.querySelector(".template-modal");
contactBtn.addEventListener("click", displayModal);
closeBtn.addEventListener("click", closeModal);
submitBtn.addEventListener("click", submitForm);

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

function submitForm(e) {
  e.preventDefault();
  console.log("coucou");
  validateFields();
}

function validateFields() {
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let email = document.getElementById("email");
  let msg = document.getElementById("msg");

  if (
    validateTextField(firstName) &&
    validateTextField(lastName) &&
    validateEmailField(email) &&
    validateTextField(msg) == true
  ) {
    console.log("c'est validé");
    modalTemp.style.display = "none";
  }
}

function validateTextField(field) {
  let isValid =
    field.value.trim().length > 1 && /^[a-zéèêë ,.'-']+$/i.test(field.value);
  return isValid;
}
function validateEmailField(field) {
  let email = field.value;
  let isValid = /^[\.\w_-]+@[\w-]+\.[a-z]{2,4}$/i.test(email);

  return isValid;

  console.log("c'est pas bon");
}

export { submitForm };
