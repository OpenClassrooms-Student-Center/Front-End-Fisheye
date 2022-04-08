
// Première partie open close
//___________________________________________________________________________________________________________________________________


// DOM Elements
const modalbg = document.querySelector(".bground");
const formulary = document.querySelector("form");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const close = document.querySelector(".close"); //constante qui récupère l'élément correspondant à la croix
const btnClose = document.querySelector(".btn-close");
const modalTitle = document.querySelector("#modal-title");
const firstname = document.querySelector("#first");


// launch modal form and reset data
function launchModal() {
  modalbg.style.display = "block";
  const artistNameH2 = document.querySelector("#artist-name");//DOM h2 demandé ici car pas construit avant l'exécution des scripts
 modalTitle.innerHTML = "Contactez-moi"+"\n" +artistNameH2.textContent;// \n saut de ligne
  formulary.reset();
  formulary.style.display = "block"; // pour être sûr que le formulaire s'affiche dans tous les cas
  dataSent.style.display = "none"; // pour supprimer message d'envoi des données si nous voulons faire un autre enregistrement
  for (let step = 0; step < 3; step++) {
    formularyData[step].removeAttribute("data-error-visible");
  } // pour supprimer les bordures par défaut au lieu du rouge ou du bleu
  firstname.focus();
}



//attendre un clic sur la classe close puis lancer la fonction closeModal
close.addEventListener("click", closeModal);
btnClose.addEventListener("click", closeModal);




//fonction permettant de fermer la modale en cliquant sur la croix
function closeModal(disabled) {
  modalbg.style.display = "none";
}





// Deuxième partie validation
//___________________________________________________________________________________________________________________________________


// DOM constants definitions
const content = document.querySelector(".content");

const formularyData = document.querySelectorAll(".formData");
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const message = document.querySelector("#textarea")
const buttonSubmit = document.querySelector(".btn-submit");
const formError = document.querySelector(".formError");
const dataSent = document.querySelector(".data-sent");
// Regex const definition
const regexName = /^[a-zA-Z-\s]+$/;
const regexEmail = /([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+).([a-zA-Z]{2,5})/;
const regexNumber = /^([0-9]|[1-9][0-9]|)$/;

// Pour empêcher la soumission par défaut du formulaire et permettre à notre fonction de validation de le vérifier en premier
formulary.addEventListener("submit", (e) => {
  e.preventDefault();
  validate();
});

// écoute de la saisie au clavier pour aider le client

firstName.addEventListener("input", function (e) {
  let value = e.target.value;
  if (value.trim().length >= 2 && regexName.test(value)) {
    formularyData[0].setAttribute("data-error-visible", "false");
  } else {
    formularyData[0].setAttribute("data-error-visible", "true");
  }
});

lastName.addEventListener("input", function (e) {
  let value = e.target.value;
  if (value.trim().length >= 2 && regexName.test(value)) {
    formularyData[1].setAttribute("data-error-visible", "false");
  } else {
    formularyData[1].setAttribute("data-error-visible", "true");
  }
});

email.addEventListener("input", function (e) {
  let value = e.target.value;
  if (regexEmail.test(value)) {
    formularyData[2].setAttribute("data-error-visible", "false");
  } else {
    formularyData[2].setAttribute("data-error-visible", "true");
  }
});

// La grande fonction de validation qui teste toutes les valeurs d'entrée
function validate() {
  let numberOfErrors = 0;

  if (firstName.value.trim().length >= 2 && regexName.test(firstName.value)) {
    formularyData[0].setAttribute("data-error-visible", "false");
  } else {
    formularyData[0].setAttribute("data-error-visible", "true");
    numberOfErrors++;
  }

  if (lastName.value.trim().length >= 2 && regexName.test(lastName.value)) {
    formularyData[1].setAttribute("data-error-visible", "false");
  } else {
    formularyData[1].setAttribute("data-error-visible", "true");
    numberOfErrors++;
  }

  if (regexEmail.test(email.value)) {
    formularyData[2].setAttribute("data-error-visible", "false");
  } else {
    formularyData[2].setAttribute("data-error-visible", "true");
    numberOfErrors++;
  }
 

  //console.log(numberOfErrors);

  if (numberOfErrors > 0) {
    formError.style.opacity = "1";
  } else {
    formulary.style.display = "none";
    dataSent.style.display = "flex";
  }





  console.log("contenu des champs du formulaire de contact :",firstName.value,lastName.value,email.value,message.value);
}




