/* eslint-disable no-unused-vars */
/*********************************************************************************
*
* This file contains all the functions required to manage modal form
*
/*********************************************************************************/
import { manageAccessibilityFocus } from './accessibility.js';
/**
 * initialization of form
 * @param {function} closeModal
 * @param {object} photographer
 */
const initContactForm = (closeModal, photographer) => {
  // we retrieve the photographer in preparation for sending him a message
  // directly to his e-mail address (when it's added to the database)
  // photographer.email
  const form = document.getElementById('contact-form');
  // manage form when submit
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    manageForm(form, closeModal);
    // manage focus on first invalid form data
    if (document.querySelector('.input-error')) {
      document.querySelector('.input-error').focus();
    }
  });
};

/**
 * This function retrieves information from the reservation form
 * and tests whether the fields are valid.
 * @param {HTMLElement} form
 * @param {function} closeModal
 */
const manageForm = (form, closeModal) => {
  try {
    // Regexp for conditions
    const emailRegExp = new RegExp('[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+');
    // conditions
    const firstNameCondition = form.firstName.value.length > 2;
    const lastNameCondition = form.lastName.value.length > 2;
    const emailCondition = emailRegExp.test(form.email.value);
    const messageCondition = form.message.value.length > 20;
    // for print errors messages if necessary
    checkInput(
      form.firstName,
      firstNameCondition,
      'Veuillez entrer 2 caractères ou plus pour votre prénom.'
    );
    checkInput(
      form.lastName,
      lastNameCondition,
      'Veuillez entrer 2 caractères ou plus pour votre nom.'
    );
    checkInput(
      form.email,
      emailCondition,
      'Veuillez entrer une adresse email valide.'
    );
    checkInput(
      form.message,
      messageCondition,
      "Veuillez entrer un message d'au moins 20 caractères."
    );
    // for check if all is ok
    if (
      checkInput(
        form.firstName,
        firstNameCondition,
        'Veuillez entrer 2 caractères ou plus pour votre prénom.'
      ) &&
      checkInput(
        form.lastName,
        lastNameCondition,
        'Veuillez entrer 2 caractères ou plus pour votre nom.'
      ) &&
      checkInput(
        form.email,
        emailCondition,
        'Veuillez entrer une adresse email valide.'
      ) &&
      checkInput(
        form.message,
        messageCondition,
        "Veuillez entrer un message d'au moins 20 caractères."
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
      displayContactValidation(form, closeModal);
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
 * @returns {boolean}
 */
function checkInput(input, condition, errorMessage) {
  let valid = true;
  if (!condition) {
    printErrorMessage(errorMessage, input);
    input.setAttribute('aria-invalid', 'true');
    valid = false;
  } else {
    // clear the error message if exists
    clearErrorMessage(input);
    input.setAttribute('aria-invalid', 'false');
  }
  return valid;
}
/**
 * This function displays the error message passed as a parameter
 * in the span created below the problematic element.
 * If the span already exists, it is reused to avoid multiplying error messages.
 * @param {string} message
 * @param {object} parentElement
 */
function printErrorMessage(message, parentElement) {
  let spanErrorMessage = document.getElementById(`error-${parentElement.id}`);
  if (!spanErrorMessage) {
    parentElement.setAttribute('aria-describedby', `error-${parentElement.id}`);
    spanErrorMessage = document.createElement('span');
    spanErrorMessage.id = `error-${parentElement.id}`;
    spanErrorMessage.classList.add('error-message');
    spanErrorMessage.role = 'alert';
    parentElement.classList.add('input-error');
    // insert span after parent
    parentElement.insertAdjacentElement('afterend', spanErrorMessage);
  }
  spanErrorMessage.innerText = message;
}
/**
 * This function clears the error message if exists
 * @param {object} parentElement
 */
function clearErrorMessage(parentElement) {
  const spanErrorMessage = document.getElementById(`error-${parentElement.id}`);
  if (spanErrorMessage) {
    spanErrorMessage.remove();
    parentElement.classList.remove('input-error');
    parentElement.removeAttribute(
      'aria-describedby',
      `error-${parentElement.id}`
    );
  }
}
/**
 * this function hide the form and show a validation message
 * @param {HTMLElement} form
 * @param {function} closeModal
 */
function displayContactValidation(form, closeModal) {
  const contactValidationDiv = document.querySelector(
    '.modal__contact-validation'
  );
  const closeValidation = document.getElementById('close-validation');
  form.style.display = 'none';
  contactValidationDiv.style.display = 'flex';
  closeValidation.addEventListener('click', () => {
    closeModal();
  });

  // accessibility trap focus
  const closeModalBtn = document.querySelector(`.modal__contact-close-button`);
  manageAccessibilityFocus(
    contactValidationDiv,
    'style',
    'display: flex;',
    closeModal,
    closeModalBtn,
    closeValidation
  );
}

export { initContactForm };
