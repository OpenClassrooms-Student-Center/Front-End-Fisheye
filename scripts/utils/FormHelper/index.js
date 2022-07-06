// form contain user input
const form = document.querySelector("form");
const closeForm = document.querySelector(".close-form");
const formData = document.querySelectorAll(".formData");

// user inputs
const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

form.addEventListener("submit", (event) => validateForm(event));

/**
 * reset form data
 */
const resetFormData = () => {
  firstNameInput.value = "";
  lastNameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";
};
/**
 * Get user data
 * @returns data for user input form
 */
const userInput = () => {
  let data = {};

  data = {
    firstName: firstNameInput.value.trim(),
    lastName: lastNameInput.value.trim(),
    email: emailInput.value.trim(),
    message: messageInput.value.trim(),
  };
  return data;
};

/**
 * Display error message
 * @param {[]} errors
 */
const displayErrorMessage = (errors) => {
  console.log("errors length => ", errors.length);
  if (errors.length != null)
    errors.map((error) => {
      const element = error[0];
      const errorMessage = error[1];
      element.parentNode.setAttribute("data-error-visible", true);
      element.parentNode.setAttribute("data-error", errorMessage);
    });
};

/**
 * Check user inputs
 * @param {Object} data
 * @returns []:errors || null
 */
const checkInputValues = (data) => {
  console.log("data==> ", data);
  let errors = [];

  const regexText = /^[a-z ,.'-]+$/i;
  // Email
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // firstName
  !regexText.test(data.firstName) || data.firstName?.length < 2
    ? errors.push([
        firstNameInput,
        "Vous devez renseigner un prénom valide (2 caractères ou plus).",
      ])
    : null;

  // lastname
  !regexText.test(data.lastName) || data.lastName.length < 2
    ? errors.push([
        lastNameInput,
        "Vous devez renseigner un nom valide (2 caractères ou plus).",
      ])
    : null;

  //email
  !data.email.match(emailRegex)
    ? errors.push([emailInput, "Veuillez entrer une adresse mail valide."])
    : null;
  //message
  data.message.length < 10
    ? errors.push([messageInput, "Veuillez entrer   au moins 10 caractères."])
    : null;

  return errors;
};

/**
 * Confirm user data and cose modal form and display end modal thanks
 * @param {*} event
 */
const confirmForm = (event) => {
  //stop event propagation
  event.preventDefault();
  resetFormData();
  form.addEventListener("click", () => form.submit());
  closeForm.addEventListener("click", () => form.submit());
};

/**
 * check if form valid and display error message if exist
 * @param {event} event
 * @return {boolean} for manage closing modal
 */
const validateForm = (event) => {
  //stop event propagation
  event.preventDefault();

  const data = userInput();
  let isValid = false;

  const errors = checkInputValues(data);
  console.log(errors);

  // initialize errors message for all inputs form
  formData.forEach((element) => {
    element.setAttribute("data-error-visible", false);
    element.setAttribute("data-error", "");
  });

  displayErrorMessage(errors);

  // if no error we confirm the form
  if (!errors.length) {
    isValid = true;
    confirmForm(event);
    return { isValid, data };
  }
  return { isValid, data };
};

/**
 * Checks if the inputs is valid
 */
export const checkUserInputs = () => {
  return validateForm(event);
};
