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
      formFocus();
    modalBg.style.display = "flex";
    let phName = `${PHOTOGRAPHERS[0].name}`;
    modalPhName.innerHTML = phName;
  }
  function closeModal() {
      formBlur();
    modalBg.style.display = "none";
    modalBg.setAttribute("aria-hidden", "true");
    form.reset();
  }
  modalBtn.addEventListener("click", launchModal);
  modalCloseBtn.addEventListener("click", closeModal);
  //validation du formuaire
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let isValid = 0;
    if (firstName.value < 2) {
      errName.setAttribute(
        "data-error",
        "veillez saisir deux (2) carateres minimum"
      );
      errName.setAttribute("data-error-visible", "true");
    } else {
      errName.setAttribute("data-error-visible", "false");
      isValid++;
    }
    if (lastName.value < 2) {
      errSurname.setAttribute(
        "data-error",
        "veillez saisir deux (2) carateres minimum"
      );
      errSurname.setAttribute("data-error-visible", "true");
    } else {
      errSurname.setAttribute("data-error-visible", "false");
      isValid++;
    }
    if (!email.value) {
      errEmail.setAttribute(
        "data-error",
        "merci de saisir une adresse E-mail valide"
      );
      errEmail.setAttribute("data-error-visible", "true");
    } else {
      errEmail.setAttribute("data-error-visible", "false");
      isValid++;
    }
    if (!message.value) {
      errMessage.setAttribute("data-error", "veillez saisir votre message");
      errMessage.setAttribute("data-error-visible", "true");
    } else {
      errMessage.setAttribute("data-error-visible", "false");
      isValid++;
    }
    if (isValid === 4) {
      modalBg.style.display = "none";
      form.reset();
    }
});
//fermeture de la modale avec les touches Tab et Retour
function tabClose(e){
  if (e.code == "Escape") {
    modalBg.style.display = 'none';
    form.reset();
  };
}
document.addEventListener("keydown", tabClose);

//fonction pour lecture d'outils d'assistance
function formFocus () {
    form.focus();
    modalBg.setAttribute("tabindex", "1");
}
function formBlur () {
    form.blur();
    modalBg.setAttribute("tabindex","0");
}
}