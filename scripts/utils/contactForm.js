function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const form = document.querySelector('form');
const firstnameField = document.getElementById('first');
const lastnameField = document.getElementById('last');
const emailField = document.getElementById('email');
const msgField = document.getElementById('message');

// Fonction générique pour la validation des champs
function validateField(field, errorElement, regex, errorMessage) {
    const value = field.value.trim();
    if (regex.test(value)) {
      errorElement.style.display = 'none';
      field.classList.remove('error');
      return true;
    } else {
      errorElement.style.display = 'block';
      errorElement.innerText = errorMessage;
      field.classList.add('error');
      return false;
    }
  }

// Validation du prénom
function checkInputFirst() {
    return validateField(
      firstnameField,
      firsterror,
      /^[A-Za-zÀ-ÖØ-öø-ÿ-]{2,}$/,
      "Veuillez entrer 2 caractères ou plus."
    );
  }

// Validation du nom de famille
function checkInputLast() {
  return validateField(
    lastnameField,
    lasterror,
    /^[A-Za-zÀ-ÖØ-öø-ÿ-]{2,}$/,
    "Veuillez entrer 2 caractères ou plus."
  );
}

// Validation de l'adresse e-mail
function checkEmail() {
  return validateField(
    emailField,
    emailerror,
    /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    "Veuillez renseigner une adresse mail valide."
  );
}

// Validation du nom de famille
function checkInputMessage() {
    return validateField(
      msgField,
      messageerror,
      /^[A-Za-zÀ-ÖØ-öø-ÿ-]{2,}$/,
      "Veuillez entrer 2 caractères ou plus."
    );
  }

// Écouteurs d'événements pour les champs
firstnameField.addEventListener("change", checkInputFirst);
lastnameField.addEventListener("change", checkInputLast);
emailField.addEventListener("change", checkEmail);
msgField.addEventListener("change", checkInputMessage);

// Envoyer le formulaire si tous les conditions sont True 
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (
      checkInputFirst() &&
      checkInputLast() &&
      checkEmail() &&
      checkInputMessage()
    ) {
        console.log("Prénom : "+firstnameField.value)
        console.log("Nom : "+lastnameField.value)
        console.log("Email : "+emailField.value)
        console.log("Message : "+msgField.value)
        closeModal()
        form.reset();
    }
  });