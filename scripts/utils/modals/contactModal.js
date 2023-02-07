// --------------- FICHIER GERANT LE MODAL ET LE FORMULAIRE DE CONTACT --------------- 

import genericUtils from '../generic.js';


/* Configure le comportement du modal et du formulaire
Paramètres :
- Aucun
Renvoie :
- Rien
*/
function createModalBehaviour(modal) {
    
    const modalTitle = modal.querySelector('.modal__title'),
        errorAttributeName = 'data-error',
        errorVisibleAttributeName = 'data-error-visible';

    function init() {

        const closeModalButton = document.querySelector('.modal-contact__close')
    
        closeModalButton.addEventListener('click', closeModal)
        document.addEventListener('keydown', (e) => setModalBehaviourOnKeyDown(e))
    
        // Conserve le focus dans le modal
        const focusableElements = modal.querySelectorAll('button, input, textarea, [tabindex]:not([tabindex="-1"])')
        genericUtils.trapFocusOnModal(modal, focusableElements, modal, closeModalButton)
    
        // L'ensemble des checks de validation à effectuer sur le formulaire
        const checks = getFormChecksToPerform()
    
        Object.keys(checks).forEach(key =>  {
            const inputElement = document.querySelector(checks[key].selector)
            // Écoute d'un évènement input -> La saisie de l'utilisateur déclenchera les fonctions définies dans l'event listener
            inputElement.addEventListener('input', e => checks[key].func(e.target, checks[key]))
        })
    
        // Ecoute sur le bouton d'envoi du formulaire
        document.querySelector(".send-message").addEventListener('click', (e) => contactPhotographer(e))
    }
    


    /****************************** FONCTIONS **************************************** */

    /* Affiche le modal et cache pour les SR le reste de la page
        Paramètres :
            - Un modal
            - Le nom d'un photographe
        Renvoie :
            - Rien
    */
    function displayModal(photographerName) {

        modalTitle.innerHTML = `Contactez-moi <br> ${photographerName}` 

        modal.showModal()
        modal.classList.add('visible')
        modal.setAttribute('aria-hidden', 'false')

        modal.focus()

    }

    /* Définit l'action si l'utilisateur presse échap
        Paramètres :
            - La touche appuyée
        Renvoie :
            - Rien
    */
    function setModalBehaviourOnKeyDown(e) {
        const keyName = e.keyCode ? e.keyCode : e.key
        if (keyName === 'Escape' || keyName === 27) {
            closeModal()
        }        
    }    


    /* Ferme le modal et rend visible pour les SR le reste de la page 
        Paramètres :
            - Aucun
        Renvoie :
            - Rien
    */    
    function closeModal() {
        modal.close()
        modal.classList.remove('visible')
        modal.setAttribute('aria-hidden', 'true')
    }
    

    /* Envoie le message au photographe
        Paramètres :
            - l'évènement de soumission de formulaire
        Renvoie :
            - console log la data renseignée par l'utilisateur
    */
    function contactPhotographer(e) {
    
        e.preventDefault()
    
        // Lance l'ensemble des checks de validation pour chaque input
        const { values, checkSuccess } = checkInputs()
    
        if(checkSuccess) {
        // Tous les checks ont été validés, on peut continuer 
            finishForSubmission()
            consoleLog(values)
            
        } else {
            
            // le formulaire n'est pas valide, il faut que le SR informe l'utilisateur
            const errorElement = document.createElement('p')
            errorElement.textContent = "Formulaire non valide, parcourez chaque champ"
            e.target.parentNode.insertAdjacentElement('afterbegin', errorElement)
            errorElement.setAttribute("class", "sr-only")
            errorElement.setAttribute("tabindex", "0")
            errorElement.focus()

            // Pour ne pas déranger la navigation du SR, le message d'erreur est enlevé au bout d'un certain temps
            setTimeout(() => errorElement.remove(), 3000)
        }
    }
    
    
    /* Lance plusieurs checks de validation  
        Paramètres :
            - Aucun
        Renvoie :
            - les valeurs du champ du formulaire
            - Un booléen. Vrai si le check passe, faut s'il y a une erreur de saisie 
    */
    function checkInputs() {
    
        let checkSuccess = true,
            values = []
    
        Object.keys(checks).forEach(key => {

            // Récupère le champ du formulaire
            const inputElement = document.querySelector(checks[key].selector)
            
            // Résultat du test de validation de l'input
            const newCheckSuccess = checks[key].func(inputElement, checks[key])

            // Si le nouveau check ne passe pas, le formulaire est considéré invalide
            checkSuccess = checkSuccess && newCheckSuccess 

            // Les valeurs des champs du formulaire
            values[checks[key].label] = inputElement.value
        })
    
        return { values: values, checkSuccess: checkSuccess }
    }
    
    
    /* Définit les champs à checker et quelle est leur fonction de vérification à appliquer
        Paramètres :
            - Aucun
        Renvoie :
            - La liste des checks requis
    */
    function getFormChecksToPerform() {
    
        /* Objet regroupant un ensemble d'informations pour chaque input 
        notamment le selecteur css ainsi que la fonction de validation 
        à effectuer avant d'effectuer l'envoi de réservation et les messages
        d'erreur à afficher si l'input n'est pas bien renseigné */
        const checks = {
    
            firstName: {
                selector: '#firstName',
                label: 'First Name',
                func: checkName,
                valueMissingMessage: "Vous devez indiquer un prénom.",
                tooShortMessage: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
                invalidFormatMessage: "Vérifiez votre prénom, le format ne semble pas correct."
            },
    
            lastName: {
                selector: '#lastName',
                label: 'Last Name',
                func: checkName,
                valueMissingMessage: "Vous devez indiquer un nom.",
                tooShortMessage: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
                invalidFormatMessage: "Vérifiez votre nom, le format ne semble pas correct."
            },
            
            email: {
                selector: '#email',
                label: 'Email',
                func: checkEmail,
                valueMissingMessage: "Vous devez indiquer un email.",
                invalidFormatMessage: "Vérifiez votre email, le format ne semble pas correct."
            },  
    
            message: {
                selector: '#message',
                label: 'Message',
                func: checkMessage,
                valueMissingMessage: "Vous devez écrire un message pour contacter la personne.",
                tooShortMessage: "Votre message doit avoir au moins 20 caractères.",
            },
        }
    
        return checks
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
        element.setAttribute('aria-invalid', true)
    }
    
    
    
    /* Ferme le formulaire et affiche le message de confirmation
        Paramètres :
            - Aucun
        Renvoie :
            - Rien
    */
    function finishForSubmission() {
        closeModal()
        window.scrollTo({top: 0, left: '50%'})
        showConfirmationPopup()
    }
    
    
    function consoleLog(values) {
        console.table(values)
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

    return { init, displayModal }
}


export  { createModalBehaviour }