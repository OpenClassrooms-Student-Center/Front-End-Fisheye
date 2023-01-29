function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.classList.add('visible')
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.classList.remove('visible')
}

 
/****************************** FORM **************************************** */
/********************************************************************** */
const submitFormButton = document.querySelector(".send-message")
submitFormButton.addEventListener('click', (e) => contactPhotographer(e))


/****************************** FORM VALIDATION **************************************** */
/********************************************************************** */

// Input elements
const errorAttributeName = 'data-error',
    errorVisibleAttributeName = 'data-error-visible'

/* Objet regroupant un ensemble d'informations pour chaque input 
notamment le selecteur css ainsi que la fonction de validation 
à effectuer avant d'effectuer l'envoi de réservation et les messages
d'erreur à afficher si l'input n'est pas bien renseigné */
const checks = {

    firstName: {
        selector: '#firstName',
        func: checkName,
        valueMissingMessage: "Vous devez indiquer un prénom.",
        tooShortMessage: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
        invalidFormatMessage: "Vérifiez votre prénom, le format ne semble pas correct."
    },

    lastName: {
        selector: '#lastName',
        func: checkName,
        valueMissingMessage: "Vous devez indiquer un nom.",
        tooShortMessage: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
        invalidFormatMessage: "Vérifiez votre nom, le format ne semble pas correct."
    },
    
    email: {
        selector: '#email',
        func: checkEmail,
        valueMissingMessage: "Vous devez indiquer un email.",
        invalidFormatMessage: "Vérifiez votre email, le format ne semble pas correct."
    },  

    message: {
        selector: '#message',
        func: checkMessage,
        valueMissingMessage: "Vous devez écrire un message pour contacter la personne.",
        tooShortMessage: "Votre message doit avoir au moins 20 caractères.",
    },
}

Object.keys(checks).forEach(key =>  {

    inputElement = document.querySelector(checks[key].selector)

    // Écoute d'un évènement input -> La saisie de l'utilisateur déclenchera les fonctions définies dans l'event listener
    inputElement.addEventListener('input', e => checks[key].func(e.target, checks[key]))

})


/****************************** FUNCTIONS **************************************** */
/********************************************************************** */


/* Check la saisie du formulaire 
et bloque l'envoie si des inputs n'ont pas bien été renseigné
    Paramètres :
        - l'évènement de soumission de formulaire
    Renvoie :
        - Rien
*/
function contactPhotographer(e) {

    e.preventDefault()

    let checkSuccess = true // Variable indiquant si le formulaire est considéré valide ou non

    // Lance l'ensemble des checks de validation pour chaque input
    checkSuccess = checkInputs()

    if(checkSuccess) {
    // Tous les checks ont été validés, on peut continuer 
        finishForSubmission()
    } 
}


/* Lance plusieurs checks de validation  
    Paramètres :
        - Aucun
    Renvoie :
        - booléen. Vrai si le check passe, faut s'il y a une erreur de saisie 
*/
function checkInputs() {

    let checkSuccess = true

    // Boucle sur chaque check et l'effectue sur l'input associé
    Object.keys(checks).forEach(key => {
        const inputElement = document.querySelector(checks[key].selector),
            newCheckSuccess = checks[key].func(inputElement, checks[key])
        checkSuccess = checkSuccess && newCheckSuccess // Si le nouveau check ne passe pas, le formulaire est considéré invalide
    })

    return checkSuccess
}


/* Check la saisie du prénom ou du nom
Affiche un message en fonction de la validité ou non de la saisie
    Paramètres :
        - un élémént html 
        - un objet regroupant les infos concernant cet élément et le check à valider
    Renvoie :
        - booléen. Vrai si le check passe, faut s'il y a une erreur de saisie 
*/
function checkName(element, check) {
    
    let checkSuccess = false

    // L'expression régulière n'autorisant que certains caractères (alphanumérique, accents, underscore et hyphens )
    const nameRegex = /^[\wà-üÀ-Ü-]+$/

    const parentElement = element.parentElement

    if (element.validity.valueMissing) {
    // l'input est vide
        showText(parentElement, check.valueMissingMessage)
    } else if (element.validity.tooShort) {
    // Le nombre de caractères minimum n'est pas atteint
        showText(parentElement, check.tooShortMessage)
    } else {
    // Aucune erreur sur l'input
        checkSuccess = checkRegexFormat(element.value, nameRegex, parentElement, check.invalidFormatMessage)
    }

    return checkSuccess
}


/* Check la saisie de l'email
Affiche un message en fonction de la validité ou non de la saisie
    Paramètres :
        - un élémént html 
        - un objet regroupant les infos concernant cet élément et le check à valider
    Renvoie :
        - booléen. Vrai si le check passe, faut s'il y a une erreur de saisie 
*/
function checkEmail(element, check) {

    let checkSuccess = false

    // L'expression régulière définissant le bon format d'email
    const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/

    const parentElement = element.parentElement
  
    if (element.validity.valueMissing) {
    // l'input est vide
        showText(parentElement, check.valueMissingMessage)
    } else {
        checkSuccess = checkRegexFormat(element.value, emailRegExp, parentElement, check.invalidFormatMessage)
    } 

    return checkSuccess
}


/* Check la saisie du message à envoyer au photographe
Affiche un message en fonction de la validité ou non de la saisie
    Paramètres :
        - un élémént html 
        - un objet regroupant les infos concernant cet élément et le check à valider
    Renvoie :
        - booléen. Vrai si le check passe, faut s'il y a une erreur de saisie 
*/
function checkMessage(element, check) {
    
    let checkSuccess = false

    const parentElement = element.parentElement
console.log(element.validity)
    if (element.validity.valueMissing) {
    // l'input est vide
        showText(parentElement, check.valueMissingMessage)
    } else if (element.validity.tooShort) {
    // Le nombre de caractères minimum n'est pas atteint
        showText(parentElement, check.tooShortMessage)
    } else {
    // L'input est correct
        checkSuccess = true
        parentElement.setAttribute(errorVisibleAttributeName, false)
    }

    return checkSuccess
}


/* Check le format de la saisie
Affiche un message en fonction de la validité ou non du format
    Paramètres :
        - une valeur, qui sera testée par l'exp régulière
        - l'exp régulière
        - un élémént html 
        - un message d'erreur
    Renvoie :
        - booléen. Vrai si le check passe, faut s'il y a une erreur de saisie 
*/
function checkRegexFormat(value, regExp, element, message) {

    let checkSuccess = false

    // Check si l'input saisie vérifie le format attendu
    const results = value.match(regExp)

    if(!results) {
    // l'input n'est pas conforme au format attendu
        showText(element, message)
    } else {
    // L'input est correct
        checkSuccess = true
        element.setAttribute(errorVisibleAttributeName, false)
    } 
        
    return checkSuccess
}


/* Attache un texte à un élément et l'affiche
    Paramètres :
        - un élémént html 
        - un texte 
    Renvoie :
        - Rien. 
*/
function showText(element, message) {
    element.setAttribute(errorAttributeName, message)
    element.setAttribute(errorVisibleAttributeName, true)
}



/* Ferme le formulaire et affiche le message de confirmation
    Paramètres :
        - Aucun
    Renvoie :
        - Rien
*/
function finishForSubmission() {
    closeModal()
    showConfirmationPopup()
}


/* Affiche la popup de confirmation 
    Paramètres :
        - Aucun
    Renvoie :
        - Rien
*/
function showConfirmationPopup() {
    const confirmationMessageElement = document.getElementsByClassName('confirmation-message')[0]
    confirmationMessageElement.classList.toggle('visible')
    setTimeout(() => {
        confirmationMessageElement.classList.toggle('visible')
    }, 2000);
}

