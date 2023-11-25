function displayModal(modalId) {
  const getPhotographerName = document.querySelector("article h2").textContent;
  const contactMeElement = document.querySelector(".photographerName");
  contactMeElement.innerHTML = getPhotographerName;

  const modal = document.querySelector(`#${modalId}`);
  const header = document.querySelector("header");
  const main = document.querySelector("main");

  modal.showModal();
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  header.setAttribute("aria-hidden", "true");
  main.setAttribute("aria-hidden", "true");
}

function closeModal(modalId) {
  const modal = document.querySelector(`#${modalId}`);
  const header = document.querySelector("header");
  const main = document.querySelector("main");

  modal.close();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  header.setAttribute("aria-hidden", "false");
  main.setAttribute("aria-hidden", "false");
}

function sendMessage(event) {
  event.preventDefault();

  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  if (checkInputs(firstName, lastName, email, message)) {
    closeModal();
    document.querySelector("#contactForm").reset();
  }

  const dataToSend = {
    firstName,
    lastName,
    email,
    message,
  };

  console.log(dataToSend);
}

function checkInputs(firstName, lastName, email, message) {
  let isFormValid = true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  if (firstName === "") {
    firstNameError.style.display = "block";
    isFormValid = false;
  } else {
    firstNameError.style.display = "none";
  }

  if (lastName === "") {
    lastNameError.style.display = "block";
    isFormValid = false;
  } else {
    lastNameError.style.display = "none";
  }

  if (email === "" || !emailRegex.test(email)) {
    emailError.style.display = "block";
    isFormValid = false;
  } else {
    emailError.style.display = "none";
  }

  if (message === "") {
    messageError.style.display = "block";
    isFormValid = false;
  } else {
    messageError.style.display = "none";
  }

  return isFormValid;
}

export { displayModal, closeModal, sendMessage };