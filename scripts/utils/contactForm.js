function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function closeValidModal(){
    closeBtn.style.display='block';
    setTimeout(console.log(formData),800);
    closeModal();
    displayModal();
    
  }
// DOM Elements

const toHide =document.querySelectorAll(".toHide")   
const success =document.querySelectorAll(".formSuccessMessage")
const modalBtn = document.querySelectorAll(".contact_button")
const closeBtn = document.querySelector(".btn-close")
const form = document.querySelector("form")
const formData = document.querySelectorAll(".formData")
const formDataToValidate = document.querySelectorAll(
  ".formData[data-validation-type]"
)

// Regex pour les tests input
let validName = /^[A-Za-zÀ-ÖØ-öø-ÿ '-]{2,}$/;
let validEmail = /^[a-z0-9._-]+@[a-z0-9]{1,}[a-z0-9.-]{1,62}\.[a-z]{2,4}$/;
let validMssg = /^[A-Za-zÀ-ÖØ-öø-ÿ '-.,;?!()€$%:<>]{10,}$/;


// Validation unitaire booléen de l'array element(input)/attribut (value) comparaison avec le regex
const validate = {
  name: ({ value }) => validName.test(value),
  email: ({ value }) => validEmail.test(value.toLowerCase()),
  message: ({ value }) => validMssg.test(value),
}

//fonction de validation en arrière plan avec affichage du message d'erreur si invalide
formDataToValidate.forEach((elem) => {
  elem.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", (e) => {
      const isValid = validate[elem.getAttribute("data-validation-type")]({
        value: e.target.value,
        elem,
      })
      elem.setAttribute("data-error-visible", !isValid)

    })
  })
})

//Validation finale de l'ensemble du formulaire au clique submit
function validateWholeForm() {
  formDataToValidate.forEach((elem) => {
    elem.querySelectorAll("input").forEach((input) => {
      const isValid = validate[elem.getAttribute("data-validation-type")]({
        value: input.value, elem,
      })
      elem.setAttribute("data-error-visible", !isValid)
    })
  })

  const isFormValid = [...formDataToValidate].every(
    (elem) =>
      elem.getAttribute("data-error-visible") === "false" ||
      !elem.hasAttribute("data-error-visible")
  )
  return isFormValid
}

//fonction d'attente
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// lancer l'animation css formfail contenue dans la class puis restauration à l'état antérieur
async function formFail(){
  form.classList.toggle("formFail");
  await delay(2000);
  form.classList.toggle("formFail");
}
// fonction au submit : conserver les input et lancer la validation,
// afficher le message formsuccess et boutton fermer si validation true
// lancer formfail si validation false
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(validateWholeForm()){
    form.classList.add("formSuccess");
    setTimeout(closeValidModal,200);
  } else {
    formFail();
  }
})