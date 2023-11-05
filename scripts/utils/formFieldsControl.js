/* ********************************* START GESTION DES ERREURS ENTREES ********************************* */
// Validation du prénom
function validateFirstName() {
  return validateField(
    "first",
    "firstName",
    (value) => value.length >= 2,
    "Le prénom doit avoir au moins 2 caractères."
  );
}

// Validation du nom de famille
function validateLastName() {
  return validateField(
    "last",
    "lastName",
    (value) => value.length >= 2,
    "Le nom doit avoir au moins 2 caractères."
  );
}

// Validation de l'adresse email
function validateEmail() {
  return validateField(
    "email",
    "emailField",
    (value) => controlEmail(value),
    "Veuillez saisir une adresse email valide."
  );
}

// Validation du message
function validateMessage() {
  return validateField(
    "message",
    "messageField",
    (value) => value.length >= 3,
    "Le message doit avoir au moins 3 caractères."
  );
}

// Fonction pour basculer la visibilité de l'erreur
function toggleErrorVisibility($container, isValid, errorMessage) {
  // Masquer l'erreur si le champ est valide
  if (isValid) {
    $container.removeAttribute("aria-invalid");
    const errorSpan = document.getElementById(`${$container.id}-error`);
    if (errorSpan) {
      errorSpan.remove();
    }
  } else {
    // Afficher l'erreur avec le message approprié
    $container.setAttribute("aria-invalid", "true");
    $container.setAttribute("aria-describedby", `${$container.id}-error`);

    // Créer un élément span pour afficher le message d'erreur
    const errorSpan = document.createElement("span");
    errorSpan.setAttribute("id", `${$container.id}-error`);
    errorSpan.setAttribute("role", "alert");
    errorSpan.textContent = errorMessage;

    const existingErrorSpan = document.getElementById(`${$container.id}-error`);
    if (existingErrorSpan) {
      existingErrorSpan.replaceWith(errorSpan);
    } else {
      $container.appendChild(errorSpan);
    }
  }
}
// Fonction générique pour valider un champ
function validateField(
  inputId,
  errorContainerId,
  validationFunction,
  errorMessage
) {
  const $input = document.getElementById(inputId);
  const $errorContainer = document.getElementById(errorContainerId);
  const isValid = validationFunction($input.value);
  // Toggle la visibilité de l'erreur
  toggleErrorVisibility($errorContainer, isValid, errorMessage);
  return isValid;
}

// Validation du format de l'adresse email
function controlEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

/* ********************************* END GESTION DES ERREURS ENTREES ********************************* */
