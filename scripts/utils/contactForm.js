// global variables
const form = document.getElementById("form");
const modal = document.getElementById("contact_modal");

// opening modal
function displayModal() {
  modal.style.display = "block";
}

// closing modal
function closeModal() {
  modal.style.display = "none";
  form.reset();
}

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

  // Validation
  if (errorCounter === 0) {
    form.style.display = "none";
    document.getElementById("message").innerHTML =
      "Merci pour votre inscription";
    closeBtn.style.display = "block";
    document.getElementById("closingDev").style.display = "flex";
  } else {
    document.getElementById("message").innerHTML = "";
    document.getElementById("closingDev").style.display = "none";
  }
});
