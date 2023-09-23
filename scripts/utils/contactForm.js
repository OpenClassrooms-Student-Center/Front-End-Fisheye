const contactCloseBtn = document.querySelector('.contact-modal__close-btn');
const contactModal = document.getElementById('contact-modal');
const mainDocument = document.getElementById('main');

contactCloseBtn.addEventListener('click', closeContactModal);


function displayModal() {
  const lightbox = document.createElement('div');
  lightbox.setAttribute('id', 'contact-modal-lightbox');
  mainDocument.setAttribute('aria-hidden', 'true');
  document.body.appendChild(lightbox);

  // show contact form
  contactModal.style.display = 'block';
  contactModal.setAttribute('aria-modal', 'true');
  contactModal.setAttribute('aria-hidden', 'false');
  document.getElementById('contact-lastName').focus();
  trapFocusContactModal();

  const contactForm = document.forms['contact-form'];
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation(contactForm);
  });
}

// check inputs for contact form
function formValidation(form) {
  const contactFirstName = document.getElementById('contact-firstName');
  const contactLastName = document.getElementById('contact-lastName');
  const contactEmail = document.getElementById('contact-email');
  const contactMessage = document.getElementById('contact-message');

  if (contactLastName.value === '') {
    alert('Veuillez indiquer votre prénom.');
    return;
  }

  if (contactFirstName.value === '') {
    alert('Veuillez indiquer votre nom.');
    return;
  }

  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (contactEmail.value === '' || !regex.test(contactEmail.value)) {
    alert('Veuillez indiquer votre adresse mail.');
    return;
  }

  if (contactMessage.value === '') {
    alert('Veuillez ajouter un message.');
    return;
  }

  console.log('====================================');
  console.log(`Prénom: ${contactFirstName.value}`);
  console.log(`Nom: ${contactLastName.value}`);
  console.log(`Email: ${contactEmail.value}`);
  console.log(`Message: ${contactMessage.value}`);
  console.log('====================================');
  console.log('Form successfully submitted!');

  form.reset();
  alert('Message envoyé avec succès !');
  closeContactModal();
}

// close contact modal and update aria hidden attributes
function closeContactModal() {
  contactModal.style.display = 'none';
  contactModal.setAttribute('aria-hidden', 'true');
  mainDocument.setAttribute('aria-hidden', 'false');
  document.getElementById('contact-modal-lightbox').remove();
}

// used to be able to keep the focus in the form while tabbing
function trapFocusContactModal() {
  const focusItems = contactModal.querySelectorAll('button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled])');
  const firstFocusItem = focusItems[0];
  const lastFocusItem = focusItems[focusItems.length - 1];

  contactModal.addEventListener('keydown', function(e) {
    const isTabPressed = (e.key === 'Tab');

    if (!isTabPressed) { return; }

    // if shift + tab is pressed (preventDefault avoids button to be skipped over)
    if (e.shiftKey) {
      if (document.activeElement === firstFocusItem) {
        lastFocusItem.focus();
        e.preventDefault();
      }
    // else = tab only is pressed
    } else {
      if (document.activeElement === lastFocusItem) {
        firstFocusItem.focus();
        e.preventDefault();
      }
    }
  });
}