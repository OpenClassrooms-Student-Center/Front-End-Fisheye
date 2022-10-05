//-------------------------//
// ------- Modal -------- //

/**
 * affiche le nom du photographe dans le formulaire
 */
const displayNameInForm = () => {
    // récup du nom dans le dom
    const photographerName = document.querySelector('.prenom-test').innerText
    console.log(photographerName);
    // insérer le nom dans le foemulaire
    document.querySelector('#title-form').insertAdjacentHTML("beforeend", photographerName)

}

// ------Ouuverture Fermeture Modal --------- //
const contactButton = document.querySelector('.contact_modal');

function displayModal() {
    const openContact = document.getElementById('open-contact')
    openContact.addEventListener('click', (e) => {
        e.preventDefault()
        const modal = document.querySelector(".contact_modal");
        modal.style.display = "block";
    })
}
/*
function displayModal() {
    console.log('clic');
    const modal = document.querySelector(".contact_modal");
    modal.style.display = "block";
}*/

function closeModal() {
    const modal = document.querySelector(".contact_modal");
    modal.style.display = "none";
}

//---------------------------------------------//
//  ------- Formulaire de contact ---------  //

//Récupération des éléments du dom
const firstName = document.querySelector('#prenom')
const lastName = document.querySelector('#nom')
const mail = document.querySelector('#email')
const message = document.querySelector('#message')

/**
   * Envoi du formulaire
   */
let formListener = () => {
    document.querySelector(".contact_button").addEventListener("click", (e) => {
        e.preventDefault()

        // creation objet contact
        let orderContact = {
            prénom: firstName.value,
            nom: lastName.value,
            email: mail.value,
            méssage: message.value
        }
        formSubmit(orderContact)
    })

}

formListener()

/**
 * Affichage du message de confirmation
 */
const formSubmit = (orderContact) => {
    console.log(orderContact);

}

//------- Si besoin de traité les champs --------//
/*
// Ecoute réactive de tout les champs
firstName.addEventListener('input', function () { getFirstName() })
lastName.addEventListener('input', function () { getLastName() })
mail.addEventListener('input', function () { getEmail() })


const getFirstName = () => {
    console.log(firstName.value);   
}

const getLastName = () => {
    console.log(lastName.value);   
}

const getEmail = () => {
    console.log(mail.value);
}*/

/**
   * Envoi du formulaire
   */
