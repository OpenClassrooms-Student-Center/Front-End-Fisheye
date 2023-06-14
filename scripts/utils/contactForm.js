// global variables
const form = document.getElementById("form");
const modal = document.getElementById("contact_modal");
const mainWrapper = document.getElementById("mainWrapper");
const body = document.getElementById("body");
const modalCloseBtn = document.getElementById("closeX");
const closeBtn = document.querySelector(".closing");
const modalOpenBtn = document.getElementById("open-modal-btn");
const photographerName = document.getElementById("photographer-name");

closeBtn.addEventListener("click", closeModal);
// hide elements when form is not valide
closeBtn.style.display = "none";

const onOpenModal = () => {
  mainWrapper.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("no-scroll");
  console.log(modalOpenBtn);
  modalCloseBtn.focus();
};

const onCloseModal = () => {
  mainWrapper.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("no-scroll");
  modalOpenBtn.focus();
};

// opening modal
function displayModal() {
  onOpenModal();
  modal.style.display = "block";
  form.style.display = "block";
}

// closing modal
function closeModal() {
  form.reset();
  modal.style.display = "none";
  onCloseModal();
}

// Close modal when espace key is pressed
window.addEventListener("keydown", e => {
  if (modal.getAttribute("aria-hidden") == "false" && e.key === "Escape") {
    closeModal();
  }
});

form.addEventListener("submit", function(event) {
  event.preventDefault();
  let errorCounter = 0;
  // first name minimum 2 letters
  let firstName = document.getElementById("first").value;
  if (firstName.length < 2) {
    // alert("Veuillez-ajouter un prénom avec 2 caractères minimum");
    document.getElementById("first_error").innerHTML =
      "Veuillez-ajouter un prénom avec 2 caractères minimum";
    document.getElementById("first_error").style.color = "red";
    document.getElementById("first").style.borderColor = "red";
    document.reserve.first.focus();
    errorCounter++;
  } else {
    document.getElementById("first_error").innerHTML = "";
    document.getElementById("first").style.borderColor = "";
  }
  console.log(first.value);

  // last name minimum 2 letters
  let lastName = document.getElementById("last").value;
  if (lastName.length < 2) {
    // alert("Veuillez-ajouter un nom avec 2 caractères minimum");
    document.getElementById("last_error").innerHTML =
      "Veuillez-ajouter un nom avec 2 caractères minimum";
    document.getElementById("last_error").style.color = "red";
    document.getElementById("last").style.borderColor = "red";
    errorCounter++;
  } else {
    document.getElementById("last_error").innerHTML = "";
    document.getElementById("last").style.borderColor = "";
  }
  console.log(last.value);

  // e-mail validation
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let sendEmail = !document.getElementById("email").value.match(mailformat);
  if (sendEmail) {
    // alert("Veuillez-ajouter un email valide");
    document.getElementById("email_error").innerHTML =
      "Veuillez-ajouter un email valide";
    document.getElementById("email_error").style.color = "red";
    document.getElementById("email").style.borderColor = "red";
    errorCounter++;
  } else {
    document.getElementById("email_error").innerHTML = "";
    document.getElementById("email").style.borderColor = "";
  }
  const messageForm = document.getElementById("textarea");
  console.log(email.value);
  console.log(messageForm.value);

  // Validation
  if (errorCounter === 0) {
    form.reset();
    form.style.display = "none";
    document.getElementById("personalMessage").innerHTML = "Merci pour votre message";
    closeBtn.style.display = "block";
    const closingMessage =  document.getElementById("closingDev");
    closingMessage.style.display = "flex";
    closingMessage.style.flexDirection = "column";
    closingMessage.style.alignItems = "center";
    closingMessage.style.gap = "5em";
  } else {
    document.getElementById("message").innerHTML = "";
    document.getElementById("closingDev").style.display = "none";
  }
});


