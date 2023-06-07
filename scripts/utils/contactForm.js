/**
 * @fileOverview Gestion d'une modale de contact avec validation de formulaire.
 */

// Récupération des éléments du DOM
const BGmodal = document.querySelector('.contact_modal');
const modal = document.querySelector('.modal');
const Body = document.getElementById('main-photographer');
const CloseCrossBtn = document.querySelector('.close');
const CloseModalBtn = document.getElementById('btn-close');
const ValidateModal = document.querySelector('.modal_validate');
const form = document.querySelector('form.reserve');
const modalTitle = document.getElementById('modalTitle');
const modalTitleValidation = document.getElementById('modalTitle_Validate');


// Récupération des valeurs des éléments du formulaire
const inputFirstName = document.forms.reserve.first;
const inputLastName = document.forms.reserve.last;
const inputEmail = document.forms.reserve.email;
const inputText = document.forms.reserve.txtMsg;

// Régex pour la validation des champs texte
const regexpEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const regexpFirstName = /^[a-zA-Z\s]+$/;
const regexpLastName = /^[a-zA-Z\s]+$/;

// Liste des objets à vérifier + conditions + messages de retour en cas d'erreur
const formfieldsObjects = [
  {
    formfield: inputFirstName,
    condition: () => !validateFirstName(),
    message: ''
  },
  {
    formfield: inputLastName,
    condition: () => !validateLastname(),
    message: ''
  },
  {
    formfield: inputEmail,
    condition: () => !validateEmail(),
    message: 'Veuillez entrer une adresse e-mail valide.'
  },
  {
    formfield: inputText,
    condition: () => !validateText(),
    message: 'Veuillez entrer une adresse e-mail valide.'
  }
];

// État de soumission du formulaire
let alreadyValidate = false;
// Événements de fermeture de la modale
CloseCrossBtn.addEventListener('click', closeForm);
if (CloseModalBtn) {
  CloseModalBtn.addEventListener('click', closeForm);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 27) {
    closeForm();
  }

  if (e.key === 'Enter' || e.key === 13) {
    confirmValidation();
  }
});
document.addEventListener('click', (e) => {
  if (e.target === modal) closeForm();
});

// Événements de validation du formulaire
document.forms.reserve.addEventListener('submit', confirmValidation);
document.forms.reserve.addEventListener('submit', (e) => {
  e.preventDefault();
  validate();
});

/**
 * Affiche la modale.
 */
function displayModal() {
  const contactbtn = document.querySelector(
    '.photographContainer .contact_button'
  );
  if (contactbtn){
  contactbtn.setAttribute('aria-expanded', 'true');}
    BGmodal.setAttribute('aria-hidden', 'false');
  Body.setAttribute('aria-hidden', 'true');
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 27) {
      closeForm();
    }

    if (e.key === 'Enter' || e.key === 13) {
      confirmValidation();
    }
  });
  document.addEventListener('click', (e) => {
    if (e.target === modal) closeForm();
  });

  // Événements de validation du formulaire
  document.forms.reserve.addEventListener('submit', confirmValidation);
  document.forms.reserve.addEventListener('submit', (e) => {
    e.preventDefault();
    validate();
  });

  if (alreadyValidate) {
    BGmodal.classList.add('visible');
  } else {
    BGmodal.classList.remove('hidden');
    BGmodal.setAttribute('aria-hidden', 'false');
    Body.setAttribute('aria-hidden', 'true');
    CloseCrossBtn.focus();
    BGmodal.classList.add('visible');
  }
}

/**
 * Ferme la modale.
 */
function closeForm() {
  setTimeout(() => {
    BGmodal.classList.remove('visible');
    BGmodal.classList.add('hidden');
    document.removeEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === 27) {
        closeForm();
      }
    });

    document.removeEventListener('click', (e) => {
      if (e.target === modal) closeForm();
    });

    // Événements de validation du formulaire
    document.forms.reserve.removeEventListener('submit', confirmValidation);
    document.forms.reserve.removeEventListener('submit', (e) => {
      e.preventDefault();
      validate();
    });
  }, 100);
  const contactbtn = document.querySelector(
    '.photographContainer .contact_button'
  );
  if (contactbtn){
  contactbtn.setAttribute('aria-expanded', 'false');}
}

/**
 * Confirme la validation du formulaire.
 */
function confirmValidation() {
  // const valide = true; pour tester le formulaire valide
  if (validate()) {
    console.log('Formulaire valide');
    console.log('firstName', inputFirstName.value);
    console.log('lastName', inputLastName.value);
    console.log('Email', inputEmail.value);
    console.log('message', inputText.value);
    modalTitle.classList.add('hidden');
    modalTitle.classList.remove('visible');
    form.classList.add('hidden');
    form.classList.remove('visible');
    modalTitleValidation.classList.remove('hidden');
    modalTitleValidation.classList.add('visible');
    CloseModalBtn.classList.remove('hidden');
    CloseModalBtn.classList.add('visible');
    ValidateModal.classList.remove('hidden');
    ValidateModal.classList.add('visible');
    CloseModalBtn.focus();

    alreadyValidate = true;
  }
}

/**
 * Valide le prénom.
 * @return {boolean} - Retourne vrai si le prénom est valide, faux sinon.
 */
function validateFirstName() {
  if (inputFirstName.value.trim().length < 2) {
    formfieldsObjects[0].message =
      'Veuillez entrer 2 lettres ou plus pour le prénom.';
    return false;
  }
  if (!regexpFirstName.test(inputFirstName.value.trim())) {
    formfieldsObjects[0].message =
      'Veuillez entrer uniquement des lettres pour le prénom.';
    return false;
  }
  return true;
}

/**
 * Valide le nom.
 * @return {boolean} - Retourne vrai si le nom est valide, faux sinon.
 */
function validateLastname() {
  if (
    inputLastName.value.trim().length < 2 ||
    inputLastName.value.trim() === ''
  ) {
    formfieldsObjects[1].message =
      'Veuillez entrer au minimum 2 lettres ou plus pour le nom.';
    return false;
  }
  if (!regexpLastName.test(inputLastName.value.trim())) {
    formfieldsObjects[1].message =
      'Veuillez entrer uniquement des lettres pour le nom.';
    return false;
  }
  return true;
}

/**
 * Valide l'email.
 * @return {boolean} - Retourne vrai si l'email est valide, faux sinon.
 */
function validateEmail() {
  if (!regexpEmail.test(inputEmail.value.trim())) {
    formfieldsObjects[2].message = 'Veuillez entrer une adresse mail valide.';
    return false;
  }
  return true;
}

/**
 * Valide le texte.
 * @return {boolean} - Retourne vrai si le texte est valide, faux sinon.
 */
function validateText() {
  if (inputText.value.trim().length < 10) {
    formfieldsObjects[3].message = 'Veuillez entrer au minimum 50 caractères.';
    return false;
  }
  return true;
}

/**
 * Valide globalement les données des champs input.
 * @return {boolean} - Retourne vrai si toutes les données sont valides, faux sinon.
 */
function validate() {
  let formIsTrue = true;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < formfieldsObjects.length; i++) {
    const condition = formfieldsObjects[i].condition();
    const { message } = formfieldsObjects[i];
    if (condition) {
      formfieldsObjects[i].formfield.parentElement.setAttribute(
        'data-error',
        message
      );
      formfieldsObjects[i].formfield.parentElement.setAttribute(
        'data-error-visible',
        'true'
      );
      formfieldsObjects[i].formfield.parentElement.classList.add('error');
      formfieldsObjects[i].formfield.focus();
      formIsTrue = false;
    } else {
      formfieldsObjects[i].formfield.parentElement.removeAttribute(
        'data-error'
      );
      formfieldsObjects[i].formfield.parentElement.setAttribute(
        'data-error-visible',
        'false'
      );
      formfieldsObjects[i].formfield.parentElement.classList.remove('error');
    }
  }
  return formIsTrue;
}

export default displayModal;
