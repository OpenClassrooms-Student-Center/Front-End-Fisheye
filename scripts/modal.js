export function contactModal(PHOTOGRAPHERS) {
  //declaration des variables
  const modalBtn = document.getElementById("btn-contact");
  const submitBtn = document.getElementById("submit");
  const modalBg = document.getElementById("modal-container");
  const modalCloseBtn = document.getElementById("clos-btn");
  const modalPhName = document.getElementById("photograph-name");
  const form = document.getElementById("contact-form");
  const firstName = document.querySelector("#first-name");
  const lastName = document.querySelector("#last-name");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");
  const errName = document.querySelector(".error-name");
  const errSurname = document.querySelector(".error-surname");
  const errEmail = document.querySelector(".error-email");
  const errMessage = document.querySelector(".error-message");
  //fonction d'ouverture et fermeture du formulaire
  function launchModal() {
    modalBg.style.display = "flex";
    let phName = `${PHOTOGRAPHERS[0].name}`;
    modalPhName.innerHTML = phName;
  }
  function closeModal() {
    modalBg.style.display = "none";
  }
  modalBtn.addEventListener("click", launchModal);
  modalCloseBtn.addEventListener("click", closeModal);

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let error = 0;
    if (firstName.value < 2) {
      errName.setAttribute(
        "data-error",
        "veillez saisir deux (2) carateres minimum"
      );
      errName.setAttribute("data-error-visible", "true");
      error++;
    } else {
      errName.setAttribute("data-error-visible", "false");
    }
    if (lastName.value < 2) {
      errSurname.setAttribute(
        "data-error",
        "veillez saisir deux (2) carateres minimum"
      );
      errSurname.setAttribute("data-error-visible", "true");
      error++;
    } else {
      errSurname.setAttribute("data-error-visible", "false");
    }
    const emailRegex = /^([]+)@((?:[w]+.))/;
    if (!emailRegex.test(email.value)) {
      errEmail.setAttribute(
        "data-error",
        "merci de saisir une adresse E-mail valide"
      );
      errEmail.setAttribute("data-error-visible", "true");
      error++;
    } else {
      errEmail.setAttribute("data-error-visible", "false");
    }
    if (!message.value) {
      errMessage.setAttribute("data-error", "veillez saisir votre message");
      errMessage.setAttribute("data-error-visible", "true");
      error++;
    } else {
      errMessage.setAttribute("data-error-visible", "false");
    }
    if (error >= 4) {
      modalBg.style.display = "flex";
    }
  });
}
