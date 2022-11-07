function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const form = document.getElementById('form');
form.addEventListener('submit', submitForm);

// VERIFIER LES CHAMPS CONTACT ||||||||||| en cours
// Définition des constantes
const firstName = document.getElementById("first");

// Définition des constantes d'erreurs
const errorFirstName = document.getElementById("errorfirstname");

let firstNameValid = null;

function submitForm(event) {
    console.log('toto');
    event.preventDefault();

    // POUR LE CHAMPS FIRST 
    if (firstName.value.length < 2) {

        console.log(firstName.value);
        errorFirstName.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du prénom";
        firstName.style.border = "2px solid #e54858";
        firstNameValid = false;
    } else {
        firstName.style.border = "2px solid green";
        errorFirstName.innerHTML = "";
        firstNameValid = true;
    }
}

  // on vérifie si chaque champs est valide 
  if (firstNameValid === true) {
    /*
    document.getElementById("closeform").style.display = 'block'; // on affiche la croix
    */
    document.getElementById("contact_modal").style.display = 'none'; // on cache la modale du formulaire
    // on vide les champs du formulaire
    firstName.value = "";
    firstName.style.border = "none";

    conditionUser.checked = "";
  }