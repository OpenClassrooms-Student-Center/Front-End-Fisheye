const modal = document.querySelector(".modal");
const form = document.forms["contact"];
const closeBtnForm = document.querySelector(".contact_close_button");
const submitBtn = document.querySelector("button[type='submit']");

function displayModal() {
  modal.style.display = "flex";
  closeBtnForm.focus();
}

function getElementsForm(form) {
  let names = form.querySelectorAll("input[type='text']");
  let email = form.querySelector("input[type='email']");
  let message = form.querySelector("textarea");
  return [names[0], names[1], email, message];
}

function closeModal() {
  modal.style.display = "none";

  //reset form
  let elements = getElementsForm(form);
  elements.forEach((element) => (element.value = ""));
}

// Evenement validation du formulaire
form.addEventListener("submit", function (e) {
  e.preventDefault();
  e.stopPropagation();

  let elements = getElementsForm(this);
  elements.forEach((element) => console.log(element.value));

  if (document.activeElement == submitBtn) {
    closeModal();
  }
});

setFocusOnlyInContainer(
  ".modal",
  ".contact_close_button",
  "button[type='submit']",
  closeModal
);
