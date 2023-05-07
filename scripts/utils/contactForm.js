const contactForm = {
  firstName: {
    element: document.getElementById('first-name'),
    test: () => /^[a-zA-ZÀ-ÖØ-öø-ÿ-]{2,}$/g.test(
      document.getElementById('first-name').value,
    ),
    errorMessage:
      'Veuillez entrer au moins 2 caractères (uniquement des lettres).',
  },
  lastName: {
    element: document.getElementById('last-name'),
    test: () => /^[a-zA-ZÀ-ÖØ-öø-ÿ-]{2,}$/g.test(
      document.getElementById('last-name').value,
    ),
    errorMessage:
      'Veuillez entrer au moins 2 caractères (uniquement des lettres).',
  },
  email: {
    element: document.getElementById('email'),
    test: () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(
      document.getElementById('email').value,
    ),
    errorMessage: 'Veuillez entrer une adresse email valide.',
  },
  message: {
    element: document.getElementById('message'),
    test: () => document.getElementById('message').value.length >= 10,
    errorMessage: 'Veuillez entrer au moins 10 caractères.',
  },
  submitBtn: document.querySelector('.submit_button'),
};

const mainTag = document.querySelector('main');
const modalContainer = document.querySelector('#contact_modal');
const modal = document.querySelector('.modal');
const confirmationModal = document.querySelector('.submit-confirmation');

async function getPhotographer() {
  const response = await fetch('data/photographers.json');
  const data = await response.json();
  const { photographers } = data;
  const urlParams = new URL(document.location).searchParams;
  const id = urlParams.get('id');
  return photographers.find((photographer) => photographer.id === id);
}

function resetForm() {
  Object.keys(contactForm).forEach((key) => {
    if (key !== 'submitBtn') {
      contactForm[key].element.value = '';
    }
  });
}

function closeModal() {
  const modalTitle = document.querySelector('.modal_title');
  modalTitle.remove();

  modalContainer.style.display = 'none';
  modalContainer.setAttribute('aria-hidden', 'true');

  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');

  confirmationModal.style.display = 'none';
  confirmationModal.setAttribute('aria-hidden', 'true');

  mainTag.setAttribute('aria-hidden', 'false');

  resetForm();
}

async function displayModal() {
  const photographer = await getPhotographer();

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal_title');
  modalTitle.innerHTML = `Contactez-moi<br> ${photographer.name}`;
  document.querySelector('.header_modal').prepend(modalTitle);

  modalContainer.style.display = 'flex';
  modalContainer.setAttribute('aria-hidden', 'false');

  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');

  mainTag.setAttribute('aria-hidden', 'true');

  document.querySelector('.close_modal').addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
  document.querySelector('.close_modal').focus();
}

function checkForm() {
  let isValid = true;
  Object.keys(contactForm).forEach((key) => {
    if (key !== 'submitBtn') {
      if (!contactForm[key].test()) {
        contactForm[key].element.setAttribute(
          'placeholder',
          `${contactForm[key].errorMessage}`,
        );
        contactForm[key].element.style.border = '1px solid red';
        isValid = false;
      } else {
        contactForm[key].element.setAttribute('placeholder', '');
        contactForm[key].element.style.border = '1px solid #fff';
      }
    }
  });
  return isValid;
}

function submitForm() {
  const form = {
    firstName: document.getElementById('first-name').value,
    lastName: document.getElementById('last-name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };
  console.log('Form submitted', form);
}

contactForm.submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (!checkForm()) {
    return;
  }
  submitForm();
  resetForm();

  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');

  confirmationModal.style.display = 'flex';
  confirmationModal.setAttribute('aria-hidden', 'false');
  document.querySelector('.submit-confirmation button').focus();
});
