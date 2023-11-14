/* eslint-disable no-unused-vars */
/*********************************************************************************
*
* This file contains all the functions required to manage modal form
*
/*********************************************************************************/
/**
 * initialization of form
 * @param {function} closeModal
 */
const initContactForm = (closeModal) => {
  const form = document.querySelector('#form');
  // manage form when submit
  form.addEventListener('submit', (event) => {
    // prevents default behavior (reload)
    event.preventDefault();
    manageForm(form, closeModal);
  });
};

/**
 * This function retrieves information from the reservation form
 * and tests whether the fields are valid.
 */
const manageForm = (form, closeModal) => {
  try {
    // Regexp for conditions
    const emailRegExp = new RegExp('[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+');
    // conditions
    const firstNameCondition = form.firstName.value.length > 2;
    const lastNameCondition = form.lastName.value.length > 2;
    const emailCondition = emailRegExp.test(form.email.value);
    const messageCondition = form.message.value.length > 50;
    // for print errors messages if necessary
    checkInput(
      form.firstName,
      firstNameCondition,
      'Veuillez entrer au moins 2 caractères pour ce champs.'
    );
    checkInput(
      form.lastName,
      lastNameCondition,
      'Veuillez entrer au moins 2 caractères pour ce champs.'
    );
    checkInput(
      form.email,
      emailCondition,
      'Veuillez entrer une adresse email valide.'
    );
    checkInput(
      form.message,
      messageCondition,
      "Veuillez entrer un message d'au moins 50 caractères."
    );
    // for check if all is ok
    if (
      checkInput(
        form.firstName,
        firstNameCondition,
        'Veuillez entrer 2 caractères ou plus pour ce champs.'
      ) &&
      checkInput(
        form.lastName,
        lastNameCondition,
        'Veuillez entrer 2 caractères ou plus pour ce champs.'
      ) &&
      checkInput(
        form.email,
        emailCondition,
        'Veuillez entrer une adresse email valide.'
      ) &&
      checkInput(
        form.message,
        messageCondition,
        "Veuillez entrer un message d'au moins 50 caractères."
      )
    ) {
      console.log(
        'Prénom : ' +
          form.firstName.value +
          '\nNom : ' +
          form.lastName.value +
          '\nEmail : ' +
          form.email.value +
          '\nMessage : ' +
          form.message.value
      );
      closeModal();
    }
  } catch (error) {
    console.log(error.message);
  }
};
/**
 * This function validate an input depend of conditions and manage the display of error message
 * @param {object} input
 * @param {*} condition
 * @param {string} errorMessage
 * @returns
 */
function checkInput(input, condition, errorMessage) {
  let res = true;
  if (!condition) {
    printErrorMessage(errorMessage, input);
    input.setAttribute('aria-invalid', 'true');
    res = false;
  } else {
    // clear the error message if exists
    clearErrorMessage(input);
    input.setAttribute('aria-invalid', 'false');
  }
  return res;
}
/**
 * This function displays the error message passed as a parameter
 * in the span created below the problematic element.
 * If the span already exists, it is reused to avoid multiplying error messages.
 * @param {string} message
 * @param {object} parentElement
 */
function printErrorMessage(message, parentElement) {
  let spanErreurMessage = document.getElementById(`erreur-${parentElement.id}`);
  if (!spanErreurMessage) {
    spanErreurMessage = document.createElement('span');
    spanErreurMessage.id = `erreur-${parentElement.id}`;
    spanErreurMessage.classList.add('error-message');
    spanErreurMessage.setAttribute('role', 'alert');
    parentElement.classList.add('input-error');
    // insert span after parent
    parentElement.insertAdjacentElement('afterend', spanErreurMessage);
  }
  spanErreurMessage.innerText = message;
}
/**
 * This function clears the error message if exists
 * @param {object} parentElement
 */
function clearErrorMessage(parentElement) {
  const spanErreurMessage = document.getElementById(
    `erreur-${parentElement.id}`
  );
  if (spanErreurMessage) {
    spanErreurMessage.remove();
    parentElement.classList.remove('input-error');
  }
}

export { initContactForm };
