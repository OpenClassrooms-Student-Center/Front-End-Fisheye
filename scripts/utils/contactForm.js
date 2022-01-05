const contactModal = document.getElementById('contact_modal');
const modal = document.querySelector('.modal');
const contactButton = document.getElementById('contact_button');
const contactClose = document.getElementById('contact_close');

// Création de la modale du formulaire de contact
function displayModal() {
  contactModal.style.display = 'block';
  const form = document.createElement('form');
  form.setAttribute('action', '');
  form.setAttribute('method', 'post');
  modal.appendChild(form);
  const firstNameLabel = document.createElement('label');
  firstNameLabel.setAttribute('for', 'firstname');
  firstNameLabel.innerText = 'Prénom';
  const firstName = document.createElement('input');
  firstName.setAttribute('type', 'text');
  firstName.setAttribute('name', 'firstname');
  firstName.setAttribute('id', 'firstname');
  firstName.setAttribute('required', 'true');
  const lastNameLabel = document.createElement('label');
  lastNameLabel.setAttribute('for', 'lastname');
  lastNameLabel.innerText = 'Nom';
  const lastName = document.createElement('input');
  lastName.setAttribute('type', 'text');
  lastName.setAttribute('name', 'lastname');
  lastName.setAttribute('id', 'lastname');
  lastName.setAttribute('required', 'true');
  const emailLabel = document.createElement('label');
  emailLabel.setAttribute('for', 'email');
  emailLabel.innerText = 'Email';
  const email = document.createElement('input');
  email.setAttribute('type', 'email');
  email.setAttribute('name', 'email');
  email.setAttribute('id', 'email');
  email.setAttribute('required', 'true');
  const messageLabel = document.createElement('label');
  messageLabel.setAttribute('for', 'message');
  messageLabel.innerText = 'Votre message';
  const message = document.createElement('textarea');
  message.setAttribute('type', 'message');
  message.setAttribute('name', 'message');
  message.setAttribute('id', 'message');
  message.setAttribute('required', 'true');
  message.setAttribute('role', 'text field');
  message.setAttribute('aria-label', 'your message');
  const submit = document.createElement('button');
  submit.classList.add('contact_button');
  submit.setAttribute('role', 'button');
  submit.setAttribute('aria-label', 'send');
  submit.innerText = 'Envoyer';
  form.appendChild(firstNameLabel);
  form.appendChild(firstName);
  form.appendChild(lastNameLabel);
  form.appendChild(lastName);
  form.appendChild(emailLabel);
  form.appendChild(email);
  form.appendChild(messageLabel);
  form.appendChild(message);
  form.appendChild(submit);

  submit.addEventListener('click', (e) => {
    if (firstName.value && lastName.value && email.value && message.value) {
      e.preventDefault();
      form.innerHTML = '';
      const thankYou = document.createElement('p');
      thankYou.classList.add('thank-you');
      thankYou.innerText = 'Merci pour votre message !';
      form.appendChild(thankYou)
      console.log(
        `Nom complet : ${firstName.value} ${lastName.value}, adresse e-mail : ${email.value}, message : ${message.value}`
      );
    }
  });
}

function closeModal() {
  contactModal.style.display = 'none';
  const form = document.querySelector('form');
  modal.removeChild(form);
}

contactButton.addEventListener('click', displayModal);
contactClose.addEventListener('click', closeModal);