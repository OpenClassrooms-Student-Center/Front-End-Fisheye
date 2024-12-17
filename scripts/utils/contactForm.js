// Description: Ce fichier contient les fonctions permettant de gérer le formulaire de contact  
  const firstName = document.getElementById('firstNameJS');
  const lastName = document.getElementById('lastNameJS');
  const email = document.getElementById('emailJS');
  const userMessage = document.getElementById('userMessageJS');
  //const formData = document.querySelectorAll('.contact__form--data');
  const errorElement = document.createElement("span")
  let regexName = new RegExp ("^[a-zA-Z]{2,}$")
  
/**
 * @description Cette fonction permet d'ouvrir le formulaire de contact
 * @param {*} photographer 
 * @returns
 */
export  function openModal(photographer) {
  const modal = document.getElementById('contact__modal');
  const mainContainer = document.getElementById('main');
  const btn = document.getElementById('openModalJS');
  const closeBtn = document.getElementById('closeModalJS');
  const photographerModalName = document.querySelector('.modal__form--photographerName') 
  btn.addEventListener('click', () => {
    modal.style.display = 'flex';
    photographerModalName.textContent = photographer._name;
    mainContainer.style.visibility = 'hidden';
    mainContainer.style.height = '0';
    closeBtn.focus();
  });
}
/**
 * @description Cette fonction permet de fermer le formulaire de contact
 * @returns
 */
export  function closeModal() {
  const modal = document.getElementById('contact__modal');
  const mainContainer = document.getElementById('main');
  const btn = document.getElementById('closeModalJS');
  btn.addEventListener('click', () => {
    modal.style.display = 'none';
    mainContainer.style.visibility = 'visible';
  });
}
//Création message d'erreur pour le formulaire et style des input en cas d'erreur
/**
 * @description Ces fonctions permettent de mettre en forme les champs du formulaire en cas d'erreur
 * @param {*} element
 * @param {*} errorMessage
 * @param {*} elementCreate
 * @param {*} elementParent
 */
function inputError(element){
  element.classList.add('error');
  element.setAttribute('data-error-visible', 'true')
}
function messageErreurSaisie(elementCreate, elementParent, errorMessage) {
  elementCreate.classList.add('formData','error');
  elementCreate.setAttribute('data-error', errorMessage);
  elementCreate.setAttribute('data-error-visible', 'true');
  elementCreate.setAttribute('aria-label', errorMessage);
  elementParent.parentNode.appendChild(elementCreate);
}

// fonction de validation de formulaire de saisie
/**
 * @description Cette fonction prend un nom en paramètre et valide qu'il est au bon format
 * @param {string} nom : le nom du joueur
 * @throws {Error}
 */
 function validateLastName(name){  
  if (!regexName.test (name)) {
    throw new Error (messageErreurSaisie(errorElement, lastName, "Le nom doit contenir au moins 2 lettres."),
    inputError(lastName))        
  } else {
    lastName.setAttribute('data-error-visible', 'false')  
  }
}
/**
 * @description Cette fonction prend un nom en paramètre et valide qu'il est au bon format
 * @param {string} nom : le nom du joueur
 * @throws {Error}
 */
 function validateFirstName(first){  
  if (!regexName.test (first)) {
      throw new Error (messageErreurSaisie(errorElement, firstName, "Le prénom doit contenir au moins 2 lettres."),
      inputError(firstName))        
  } else {
    firstName.setAttribute('data-error-visible', 'false')  
  }  
}
/**
* @description Cette fonction prend une adresse mail en paramètre et valide qu'elle est au bon format
* @param {string} email : le mail du client
* @throws {Error}
*/
 function validateEmail(mail){
  let regexMail = new RegExp ("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]+")
  if(!regexMail.test(mail)){
      throw new Error (messageErreurSaisie(errorElement, email,"L'email saisie n'est pas valide"),
      inputError(email))  
  } else {
    email.setAttribute('data-error-visible', 'false')  
  }     
}
/**
* @description Cette fonction prend un message en paramètre et valide qu'il est au bon format
* @param {string} message : le message du client
* @throws {Error}
*/
 function validateUserMessage (message){
    let regexMessage = new RegExp ("[a-zA-Z0-9éèàçù@\"#'^¨ \\-()={}\\[\\]/\\\\!:,;?.]{10,300}$")
  if(!regexMessage.test(message)){
      throw new Error (messageErreurSaisie(errorElement, userMessage,"Le message doit contenir au minimum 10 caractères et au maximum 300 caractères."),
      inputError(userMessage))
  } else {
    userMessage.setAttribute('data-error-visible', 'false')   
}
}
  
/**
 * @description Cette fonction permet de valider le formulaire de contact
 * @returns {Object} : les données du formulaire
 */
 function validateForm(){    
  try {
    validateFirstName(firstName.value);
    validateLastName(lastName.value);    
    validateEmail(email.value);
    validateUserMessage(userMessage.value);         
    return true;    
  } catch {
    return false;
  }  
}
/**
 * @description Cette fonction permet de réinitialiser les champs du formulaire
 * @returns {void}  
 */
function resetInput(){
  firstName.value = '';
  lastName.value = '';
  email.value = '';
  userMessage.value = '';
}

// Fonction d'envoi du formulaire
/**
 * @description Cette fonction envoie le formulaire de contact
 * @param {Object} data : les données du formulaire
 * @return {validateForm()} : les données du formulaire
 * @return {resetInput()} : réinitialise les champs du formulaire
 */
export function sendForm(){
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formValid = validateForm();
    if(formValid){
      const formData = 
        {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          userMessage: userMessage.value
        }     
      console.log(formData)
      resetInput();     
      }                   
    }) 
  };

