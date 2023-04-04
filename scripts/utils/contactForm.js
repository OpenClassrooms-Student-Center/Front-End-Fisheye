function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// Get references to the form and error div
const form = document.querySelector('form');
const button = document.querySelector('.contact_button');

// Listen for button click
button.addEventListener('click', (event) => {
  // Prevent the button from submitting the form
  event.preventDefault();

  // Remove any existing error messages and the danger div
  const dangerDiv = document.querySelector('.danger');
  if (dangerDiv) {
    dangerDiv.parentNode.removeChild(dangerDiv);
  }
  const errorDivs = document.querySelectorAll('.error');
  errorDivs.forEach(errorDiv => errorDiv.parentNode.removeChild(errorDiv));

  // Get references to the form fields and error spans
  const prenomInput = document.getElementById('prenom');
  const nomInput = document.getElementById('nom');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // Set a flag to track if any errors were found
  let hasErrors = false;

  // Check the prenom field for errors
  if (!prenomInput.value) {
    const prenomError = document.createElement('div');
    prenomError.classList.add('error');
    prenomError.innerHTML = '<p>Le prénom est obligatoire</p>';
    prenomInput.parentNode.insertBefore(prenomError, prenomInput.nextSibling);
    hasErrors = true;
  }

  // Check the nom field for errors
  if (!nomInput.value) {
    const nomError = document.createElement('div');
    nomError.classList.add('error');
    nomError.innerHTML = '<p>Le nom est obligatoire</p>';
    nomInput.parentNode.insertBefore(nomError, nomInput.nextSibling);
    hasErrors = true;
  }

  // Check the email field for errors
  if (!emailInput.checkValidity()) {
    const emailError = document.createElement('div');
    emailError.classList.add('error');
    emailError.innerHTML = '<p>Veuillez entrer une adresse email valide</p>';
    emailInput.parentNode.insertBefore(emailError, emailInput.nextSibling);
    hasErrors = true;
  }

  // Check the message field for errors
  if (!messageInput.value) {
    const messageError = document.createElement('div');
    messageError.classList.add('error');
    messageError.innerHTML = '<p>Le message est obligatoire</p>';
    messageInput.parentNode.insertBefore(messageError, messageInput.nextSibling);
    hasErrors = true;
  }

  // If there were errors, display the danger div
  if (hasErrors) {
    const dangerDiv = document.createElement('div');
    dangerDiv.classList.add('danger');
    dangerDiv.innerHTML = '<p>Veuillez corriger les erreurs ci-dessus</p>';
    form.parentNode.insertBefore(dangerDiv, form.nextSibling);
    return;
  }

  form.submit(submitForm);
});

