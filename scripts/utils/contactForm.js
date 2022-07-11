// launch modal
const modalBtn = document.getElementById("contact_button");
modalBtn.forEach((btn) => btn.addEventListener("click", displayModal));
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

// close modal
const modalCloseBtn = document.getElementById("close_btn");
modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// Form input
const checkFirstName = function(inputFirstName) {
    const errorMessageFirstName = document.getElementById("error_message_firstName");
    if (inputFirstName.length < 2 || inputFirstName === "") {
        errorMessageFirstName.style.display = "inline-block";
        document.getElementById("error_outline_firstName").style.outline =
          "1px solid #901C1C";
          return false;
    }
    errorMessageFirstName.style.display = "none";
    document.getElementById("error_outline_firstName").style.outline ="none";
    return true;
};

const checkLastName = function(inputLastName) {
    const errorMessageFirstName = document.getElementById("error_message_lastName");
  if (inputLastName.length < 2 || inputLastName === "") {
    errorMessageFirstName.style.display = "inline-block";
    document.getElementById("error_outline_lastName").style.outline =
      "1px solid #901C1C";
    return false;
  }
  errorMessageFirstName.style.display = "none";
  document.getElementById("error_outline_lastName").style.outline = "none";
  return true;
};

const checkEmail = function(inputEmail) {
    const validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const errorMessageEmail = document.getElementById("error_message_email");
    if (validRegex.test(emailInput)) {
        errorMessageEmail.style.display = "none";
        document.getElementById("error_ouline_email").style.outline = "none";
        return true;
    } else {
        errorMessageEmail.style.display = "inline-block";
        document.getElementById("error_outline_email").style.outline =
          "1px solid #901C1C";
          return false;
    }
};

const checkMessage = function(inputMessage) {
    const errorMessageMessage = document.getElementById("error_message_message");
    if (inputMessage.length > 1000) {
      errorMessageMessage.style.display = "inline-block";
      document.getElementById("error_outline_message").style.outline =
        "1px solid #901C1C";
      return false;
    }
    errorMessageMessage.style.display = "none";
    document.getElementById("error_outline_message").style.outline = "none";
    return true;
};

// Form validation
const submitBtn = document.getElementById("submit_button");
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let firstNameValue = document.getElementById("firstName").value;
    let lastNameValue = document.getElementById("lastName").value;
    let emailValue = document.getElementById("email").value;
    let messageValue = document.getElementById("message").value;

    if (
        checkFirstName(firstNameValue) === true &&
        checkLastName(lastNameValue) === true &&
        checkEmail(emailValue) === true &&
        checkMessage(messageValue) === true
    ) {
       // return alert("Votre message a bien été envoyé");
    }
});

