//Mettre le code JavaScript lié à la page photographer.html

const photographerId = window.location.search.split("?id=").join("");
console.log(photographerId);

/* Medias and photographer Handling */

let aboutPhotographer = [];
let mediasOfPhotographer = [];

let OurPhotographer = [];

async function fetchMedias() {
    // We fetch our json file with a GET method
     await fetch(`../data/photographers.json`, {
     method: 'GET'
    })
    .then(response => {
     return response.json();
   }).then(aboutPhotographer => {
     // We retrieve our medias and insert them into our array mediasOfPhotographer
    for(i= 0; i < aboutPhotographer.media.length; i++){
        if(aboutPhotographer.media[i].photographerId == photographerId){
            mediasOfPhotographer.push(aboutPhotographer.media[i])  }   
    }  // We retrieve our photographer infos and insert them into our array OurPhotographer
    for(i= 0; i < aboutPhotographer.photographers.length; i++){
    if(aboutPhotographer.photographers[i].id == photographerId){
        OurPhotographer.push(aboutPhotographer.photographers[i])
        console.log(OurPhotographer)
}       
    }       
   }).catch(err => {
     console.log("error")
   });
     
     // We return our array 
     return ({
         aboutPhotographers: mediasOfPhotographer, OurPhotographer})
 }
 async function displayData(mediasOfPhotographer) {
  let position = 1;
    const mediasSection = document.querySelector(".medias_section");
  
    mediasOfPhotographer.forEach((mediasOfPhotographer) => {
        const mediaModel = mediaFactory(mediasOfPhotographer, position);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediasSection.appendChild(mediaCardDOM);
        position += 1;
        console.log(position, "position")
    });
};
async function displayDataPhotographer(OurPhotographer) {
    const photographerSection = document.querySelector(".photograph-header");

    OurPhotographer.forEach((OurPhotographer) => {
        const photographerModel = OurPhotographerFactory(OurPhotographer);
        const userCardDOM = photographerModel.getOurUserCardDOM();
        photographerSection.appendChild(userCardDOM);
    });
};



//// TO MODIFY NOT DEFINITIVE /////

function openGallery(object){

  let img = object.getElementsByTagName('img')[0] ?? object.getElementsByTagName('video')[0];

  if(img.getAttribute('data-type') == 'img'){
    img.setAttribute("class", "gallery-item-img")
    //img.setAttribute("data-type", "img")
      document.getElementById("medias_modal_video").classList.add('none');
      document.getElementById("medias_modal_img").classList.remove('none');
      document.getElementById("gallery-img").src = img.getAttribute('src');
      
      
  } else {
    //img.setAttribute("data-type", "video")
      document.getElementById("medias_modal_img").classList.add('none');
      document.getElementById("medias_modal_video").classList.remove('none');
      //document.getElementById("medias_modal_video").src = img.getAttribute('src');
      
    }

  document.getElementById("gallery-title").innerHTML = img.getAttribute('data-title');
  //document.getElementById("gallery-previous").setAttribute('src-current', img.getAttribute('data-position'));
  //document.getElementById("gallery-next").setAttribute('src-current', img.getAttribute('data-position'));
  
  const carousel = document.getElementById('medias_modal')
  carousel.style.display = "flex";
  
  mediasSection = document.getElementById("medias")
  mediasSection.style.display="none"
  photographSection = document.getElementById('photograph_header')
  photographSection.style.display = "none"
//Creating our elements and setting them with attributes
  const button = document.getElementById('gallery-close')
  button.setAttribute("src", "assets/icons/close.svg")
  button.classList.add('closure_button')
  console.log(object, "object")
    button.appendChild(object)
}

//////////////

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await fetchMedias();
  displayData(mediasOfPhotographer);
  displayDataPhotographer(OurPhotographer);
  console.log(mediasOfPhotographer)
  console.log(OurPhotographer)
};

init();
/* -------------------------------------------------------------------- */

/* ------------------ Handling form --------------------- */
// First, we get all elements that we are going to use //

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const message = document.getElementById('message')
const submit = document.getElementById("btn-submit")
const form = document.getElementById('form')
//------------------------------------------------------------//

// Then, we create our error messages //

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById('messageError')

//------------------------------------------------------------//
// Handling form validation //

let isValidFirst = false;
let isValidLast = false;
let isValidMail = false;
let isValidMessage = false;

//  firstName Errors

firstName.addEventListener("input", (e) => {
    // If nothing was written in this input, value null and isValidFirst false
    if (e.target.value.length == 0) {
      firstNameError.innerHTML = "Le prénom doit comporter entre 2 et 25 caractères";
      valueFirstName = null;
      isValidFirst = false;
      console.log(valueFirstName);
    // If we are not between 2 and 25 characters, we display an error message, value null and isValidFirst false
    } else if (e.target.value.length < 2 || e.target.value.length > 25) {
      firstNameError.classList.add("errorMsg")
      firstNameError.innerHTML =
        "Le prénom doit comporter entre 2 et 25 caractères";
      valueFirstName = null;
      isValidFirst = false;
    }
    // If we are between 3 and 25 characters, we display a green message, value equal to what is written and isValid true
    if (e.target.value.match(/^[a-z A-Z]{2,25}$/)) {
      firstNameError.classList.remove("errorMsg")
      firstNameError.innerHTML = "";
      valueFirstName = e.target.value;
      isValidFirst = true;
    }
    // If we are between 3 and 25 characters, but some special characters are there, we delete our class for green messages and add a class for errors. display a green message, value null and isValid false
    if (
      !e.target.value.match(/^[a-z A-Z]{2,25}$/) &&
      e.target.value.length > 2 &&
      e.target.value.length < 25
    ) {
      firstNameError.classList.add("errorMsg")
      firstNameError.innerHTML =
        "le prénom ne doit pas contenir de caractère spécial (accent, chiffre)";
      isValidFirst = false;
      valueFirstName = null;
    }
  });
  
  //------------------------------------------------------------//
  
  // lastName Regex and messages style, same as firstName
  
  lastName.addEventListener("input", (e) => {
    if (e.target.value.length == 0) {
      lastNameError.innerHTML = "";
      valueLastName = null;
      isValidLast = false;
    } else if (e.target.value.length < 2 || e.target.value.length > 25) {
      lastNameError.classList.add("errorMsg")
      lastNameError.innerHTML = "Le nom doit comporter entre 2 et 25 caractères";
      valueLastName = null;
      isValidLast = false;
    }
    if (e.target.value.match(/^[a-z A-Z]{2,25}$/)) {
      lastNameError.innerHTML = "";
      valueLastName = e.target.value;
      isValidLast = true;
    }
    if (
      !e.target.value.match(/^[a-z A-Z]{2,25}$/) &&
      e.target.value.length > 2 &&
      e.target.value.length < 25
    ) {
      lastNameError.classList.add("errorMsg")
      lastNameError.innerHTML =
        "le nom ne doit pas contenir de caractère spécial (accent, chiffre)";
      console.log("caractère spécial");
      isValidLast= false;
    }
  });
  
  //------------------------------------------------------------//
  
  // Mail Regex and messages style
  
  email.addEventListener("input", (e) => {
    if (e.target.value.length == 0) {
      emailError.innerHTML = "";
      valueEmail = null;
      isValidMail = false;
    } else if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      emailError.classList.remove("errorMsg")
      emailError.innerHTML = "";
      valueEmail = e.target.value;
      isValidMail = true;
    }
    if (
      !e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
      !e.target.value == 0
    ) {
      emailError.classList.add("errorMsg")
      emailError.innerHTML =
        "un email doit être écrit avec un @ un . et des caractères (ex: gameon@gmail.com)";
      valueEmail = null;
      isValidMail = false;
    }
  });
  
  //------------------------------------------------------------//

//  Message Errors

message.addEventListener("input", (e) => {
    // If nothing was written in this input, value null and isValidFirst false
    if (e.target.value.length == 0) {
      messageError.innerHTML = "Le message doit comporter entre 2 et 500 caractères";
      valueMessage = null;
      isValidMessage = false;
    // If we are not between 2 and 25 characters, we display an error message, value null and isValidFirst false
    } else if (e.target.value.length < 2 || e.target.value.length > 500) {
      messageError.classList.add("errorMsg")
      messageError.innerHTML =
        "Le message doit comporter entre 2 et 500 caractères";
      valueMessage = null;
      isValidMessage = false;
    }
    // If we are between 3 and 25 characters, value equal to what is written and isValid true
    if (e.target.value.match(/^[a-z A-Z 0-9]{2,500}$/)) {
      messageError.classList.remove("errorMsg")
      messageError.innerHTML = "";
      valueMessage = e.target.value;
      isValidMessage = true;
    }
  });
  
  //------------------------------------------------------------//
  
  const validateForm = (e) => {
    e.preventDefault(); // Prevent reloading on submit
  
    // If form invalid, show error messages, thanks to our variables isValidFirst, Second, Mail...
  
    //first name
  if(!isValidFirst){
      firstNameError.classList.add("errorMsg")
      firstNameError.innerHTML = "Le prénom doit comporter entre 2 et 25 caractères et ne pas contenir de caractère spécial";
    }
  
     //last name
  if(!isValidLast){
    lastNameError.classList.add("errorMsg")
    lastNameError.innerHTML = "Le nom doit comporter entre 2 et 25 caractères et ne pas contenir de caractère spécial";
  }
  
     //email
     if(!isValidMail){
      emailError.classList.add("errorMsg")
      emailError.innerHTML = "un email doit être écrit avec un @ un . et des caractères (ex: fisheye@gmail.com)"
      ;
    }
         //message
         if(!isValidMessage){
            messageError.classList.add("errorMsg")
            messageError.innerHTML = "Le message doit comporter entre 2 et 500 caractères"
            ;
          }
    
    /* ------------------------------------------------- */
  
    // Form Validation by our variables IsValid...
  
  if(!isValidFirst || !isValidLast || !isValidMail || !isValidMessage){
    alert("formulaire invalide (pensez à remplir tous les champs sans erreurs, à cocher le lieu souhaité du tournoi et accepter les conditions d'utilisation")
  } 
  else {
    // Closing modal, display validation modal
    alert('formulaire validé')
    e.preventDefault();
    console.log("---------------- infos de l'utilisateur -------------")
    console.log("prénom : " + valueFirstName)
    console.log("nom : " + valueLastName)
    console.log("email : " + valueEmail)
    console.log("message : " + valueMessage)
    console.log("-----------------------------------------------------")
    closeModal()
    form.reset();
  }
  };
  /* ---------------------------------------------------------- */
 submit.addEventListener("click", validateForm);
