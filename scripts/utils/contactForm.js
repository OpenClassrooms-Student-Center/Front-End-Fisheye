//-------------------------//
// ------- Modal -------- //
const modal = document.querySelector(".contact_modal");

const contactButton = document.querySelector('.contact_modal');
const openContact = document.getElementById('open-contact')
/**
 * affiche le nom du photographe dans le formulaire 
 * contact.js
 */
const displayNameInForm = () => {
    // récup du nom dans le dom
    let photographerName = document.querySelector('.prenom-test').innerText
    console.log(photographerName);
    // insérer le nom dans le foemulaire
    document.querySelector('#title-form').insertAdjacentHTML("beforeend", photographerName)

}

// ------Ouuverture Fermeture Modal --------- //
//const contactButton = document.querySelector('.contact_modal');
/**
 * Ouverture de la modal formulaire
 * contact.js
 */
function displayModal() {
    const openContact = document.getElementById('open-contact')
    openContact.addEventListener('click', (e) => {
        e.preventDefault()
        console.log(e);
        //const modal = document.querySelector(".contact_modal");
        modal.style.display = "block";
    })

}

/**
 * fermeture de la modal
 * ecouteur sur elt closed
 */
function closeModal() {
    const btnClosed = document.getElementById('closed')
    btnClosed.addEventListener('click', (e) => {
        e.preventDefault()
        console.log(e);

        modal.style.display = "none";
    })
    // fermeture au clavier
    btnClosed.addEventListener('keypress', (e) => {

        modal.style.display = "none";

    })


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
 * Console.log de confirmation
 */
const formSubmit = (orderContact) => {
    console.log(orderContact);

    modal.style.display = "none";
}
