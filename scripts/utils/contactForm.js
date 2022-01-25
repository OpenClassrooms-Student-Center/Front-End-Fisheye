const inputFirstname = document.getElementById('firstname');
const inputLastname = document.getElementById('lastname');
const inputEmail = document.getElementById('email');
const textarea = document.getElementById('textarea');
const submitBtn = document.querySelector('.contact_button');
const form = document.querySelector('form');

//OUVERTURE DE LA MODALE
function displayModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.querySelector("main");
	modal.style.display = "block";
    main.style.filter = "blur(5px)";
}

//FERMETURE DE LA MODALE
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    main.style.filter = "blur(0px)";
}

//INSERTION DU NOM DU PHOTOGRAPHE DANS LA MODALE
function contactFactory(data) {
    const {name} = data;

    function getContactCardDOM() {
        const modal = document.querySelector(".modal");

        const photographerName = document.createElement('p');
            photographerName.textContent = name;
            photographerName.style.order = "2";
            photographerName.style.fontSize = "64px";
            photographerName.style.textAlign = "left";

        modal.appendChild(photographerName);
    }

    return {name, getContactCardDOM};
}

//VALIDATION DU FORMULAIRE 
form.addEventListener("submit", (e) => {

    let isInputFirstnameValid = false;
    let isInputLastnameValid = false;
    let isInputEmailValid = false;
    let isTextareaValid = false;

    //VERIFICATION DU CHAMPS PRENOM 
    if(inputFirstname.value == "") {
        inputFirstname.style.border = "solid 5px red";
        isInputFirstnameValid = false;
        e.preventDefault();
    }
    else {
        isInputFirstnameValid = true;
        inputFirstname.style.border = "solid 5px green";
    }

    //VERIFICATION DU CHAMPS NOM 
    if(inputLastname.value == "") {
        inputLastname.style.border = "solid 5px red";
        isInputLastnameValid = false;
        e.preventDefault();
    }
    else {
        isInputLastnameValid = true;
        inputLastname.style.border = "solid 5px green";
    }

    //VERIFICATION DU CHAMPS EMAIL 
    if(inputEmail.value == "") {
        inputEmail.style.border = "solid 5px red";
        isInputEmailValid = false ;
        e.preventDefault();
    }
    else {
        isInputEmailValid = true;
        inputEmail.style.border = "solid 5px green";
    }

    //VERIFICATION DU CHAMPS TEXTAREA 
    if(textarea.value == "") {
        textarea.style.border = "solid 5px red";
        isTextareaValid = false ;
        e.preventDefault();
    }
    else {
        isTextareaValid = true;
        textarea.style.border = "solid 5px green";
    }


    if(isInputFirstnameValid &&
        isInputLastnameValid &&
        isInputEmailValid &&
        isTextareaValid) {
            form.reset();
        }

    
})

