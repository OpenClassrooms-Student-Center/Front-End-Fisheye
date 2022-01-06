function displayModal() {
  const modal = document.getElementById('contact_modal');
  const body = document.querySelector('body');
  body.classList.add('noscroll');
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  const body = document.querySelector('body');
  body.classList.remove('noscroll');
  modal.style.display = 'none';
}

function removeMsgError(element) {
  if (element.parentElement.hasAttribute('data-error')) {
    element.parentElement.removeAttribute('data-error');
    element.parentElement.removeAttribute('data-error-visible');
  }
}

function setMsgError(element, name) {
  element.parentElement.setAttribute(
    'data-error',
    `Veuillez entrer un ${name} valide`,
  );
  element.parentElement.setAttribute('data-error-visible', 'true');
}

function firstNameIsValid(firstname) {
  const regName = /^[A-zÀ-ú -]{2,}$/;
  return regName.test(firstname.value);
}

function lastNameIsValid(lastname) {
  const regName = /^[A-zÀ-ú -]{2,}$/;
  return regName.test(lastname.value);
}

function emailIsValid(email) {
  const regEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEmail.test(email.value);
}

function messageIsValid(message) {
  if (message.value !== '') {
    return true;
  }
  return false;
}

function validate(event) {
  event.preventDefault();

  const form = event.target;
  const firstname = form[0];
  const lastname = form[1];
  const email = form[2];
  const message = form[3];

  if (messageIsValid(message)) {
    removeMsgError(message);
  } else {
    setMsgError(message, 'message');
  }
  if (firstNameIsValid(firstname)) {
    removeMsgError(firstname);
  } else {
    setMsgError(firstname, 'prénom');
  }
  if (lastNameIsValid(lastname)) {
    removeMsgError(lastname);
  } else {
    setMsgError(lastname, 'nom');
  }
  if (emailIsValid(email)) {
    removeMsgError(email);
  } else {
    setMsgError(email, 'email');
  }
  if (
    messageIsValid(message) &&
    firstNameIsValid(firstname) &&
    lastNameIsValid(lastname) &&
    emailIsValid(email)
  ) {
    console.log(`Bonjour ${firstname.value} ${lastname.value}, 
Voici votre message :
${message.value}`);
    closeModal();
    form.reset();
  }
}
