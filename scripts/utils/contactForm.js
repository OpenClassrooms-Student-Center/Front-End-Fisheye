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

// REGEX
let regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Définition des constantes
const firstName = document.getElementById("first");
const lasttName = document.getElementById("last");
const email = document.getElementById("email");
const text = document.getElementById("comments");


// Définition des constantes d'erreurs
const errorFirstName = document.getElementById("errorfirstname");
const errorLasttName = document.getElementById("errorlastname");
const errorEmail = document.getElementById("errorEmail");
const errorText = document.getElementById("errorText");

let firstNameValid = null;
let lastNameValid = null;
let emailValid = null;
let textValid = null;

function submitForm(event) {
    console.log('toto');
    event.preventDefault();

    // POUR LE CHAMP PRENOM 
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


    // POUR LE CHAMP NOM 
    if (lasttName.value.length < 2) {
        console.log(lasttName.value);
        errorLasttName.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du nom";
        lasttName.style.border = "2px solid #e54858";
        firstNameValid = false;
    } else {
        lasttName.style.border = "2px solid green";
        errorLasttName.innerHTML = "";
        lastNameValid = true;
    }

    // POUR LE CHAMP EMAIL


    if (email.value.length < 2) {
        console.log(email.value);
        errorEmail.innerHTML = "L'adresse email saisie est incorrecte.";
        email.style.border = "2px solid #e54858";
        emailValid = false;
    } else {
        email.style.border = "2px solid green";
        errorEmail.innerHTML = "";
        emailValid = true;
    }


    // POUR LE CHAMP TEXT

    if (text.value.length < 2) {
        console.log(text.value);
        errorText.innerHTML = "Veuillez saisir votre message";
        text.style.border = "2px solid #e54858";
        textValid = false;
    } else {
        text.style.border = "2px solid green";
        errorText.innerHTML = "";
        textValid = true;
    }
}

// on vérifie si chaque champs est valide 
if (firstNameValid === true, lastNameValid === true, emailValid === true, textValid === true){
    /*
    document.getElementById("closeform").style.display = 'block'; // on affiche la croix
    */
    document.getElementById("contact_modal").style.display = 'none'; // on cache la modale du formulaire
    // on vide les champs du formulaire
    firstName.value = "";
    firstName.style.border = "none";

    lasttName.value = "";
    lasttName.style.border = "none";

    email.value = "";
    email.style.border = "none";
    
    text.value = "";
    text.style.border = "none";

    conditionUser.checked = "";
}