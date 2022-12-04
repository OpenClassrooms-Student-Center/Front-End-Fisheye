import { currentPhotographer } from "../../photographerPage.js";
import { timeout } from "../timeoutFunction.js";

let modalEventToken = false
/*creation des event listeners du formulaire */
export const formEventListener = () => {
  document.querySelector(".btn-contact").addEventListener("click", contactModalDraw)
}
/*creation du formulaire */
const contactModalDraw = () => {
  const main = document.querySelector("main")
  const newLightBox = document.createElement("section");
  newLightBox.classList.add("contact-form")
  newLightBox.innerHTML = `
    <div class = "form-container" >
    <div class = "form-header">
        <h2>Contactez-moi ${currentPhotographer.name}</h2>
        <i  arial-label= "icone fermer cickable" title= "fermer" tabindex = "0" class="fas fa-times close"></i>
        </div>
        <form >
    <div class="form-data">
        <label for="first-name">Prénom</label><br>
        <input  placeholder="Votre prénom."class="text-control" type="text" id="first-name" name="first" minlength="2" /><br>
        <p class="alert" id="alert-first-name">Le prénom doit contenir au moins deux lettres</p>
    </div>
    <div class="form-data">
        <label for="last-name">Nom</label><br>
        <input  placeholder="Votre nom" class="text-control" type="text" id="last-name" name="last" minlength="2" /><br>
        <p class="alert" id="alert-last-name">le prénom doit contenir au moins deux lettres</p>
    </div>
    <div class="form-data">
        <label for="email">E-mail</label><br>
        <input  placeholder="jean@gmail.com" class="text-control" type="email" id="email" name="email" /><br>
        <p class="alert" id="alert-email">adresse mail invalide</p>
    </div>
    <div class="form-data">
        <label for="textarea">Votre message</label><br>
        <textarea  placeholder="entrez votre requette ..." minlength="12" maxlength="600"  id ="textarea" class="text-control" rows ="5" cols="33" id="textarea" name="textarea" ></textarea><br>
        <p class="alert" id="alert-textarea">veuillez entrer au moins 12 caractéres, ne pas utiliser de caractéres spéciaux</p>
    </div>
    </form>
    <button  arial-label= "bouton envoyer le formulaire"  class ="btn btn-article btn-send">Envoyer</button> 
    </div>
    `
  main.appendChild(newLightBox)
  const close = document.querySelector(".close")//creation de la croix pour fermer
  close.addEventListener("click", modalClose)//creation des event listeners de la croix
  close.addEventListener("keydown", async function (e) {
    if (e.key === "Enter") {
      modalClose(e)
      await timeout(500)
    }
  })
  if (!modalEventToken) { // event listener pour la navigation au clavier , pour evité l'ajout de plusieurs event listeners
    modalEventToken = true
    const body = document.querySelector("body")
    body.addEventListener("keydown", async function (e) {
      const contactForm = document.querySelector(".contact-form")
      if (e.key === " " && contactForm) {// to lock spacescroll when lightbox is open
        e.preventDefault();  //lock scroll
        modalClose(e)
        await timeout(500)
      }
    })
  }
  const sendButton = document.querySelector(".btn-send")
  sendButton.addEventListener("click", contactModalCheck)
  close.focus()
}
/*ferme la modale*/
const modalClose = () => {
  document.querySelector(".contact-form").remove()
}
/*controle du formulaire*/
const contactModalCheck = () => {
  const textControl = document.querySelectorAll(".text-control")
  const alerts = document.querySelectorAll(".alert")
  const checkName = /^([a-zA-Z]){2,20}$/;//les regex pour controller les champs
  const checkMail = /^\S+@\S+\.\S+$/;//@ .
  const checkTextarea = /^([a-zA-Z0-9 ,.?!éàèç]){12,600}$/
  console.log(textControl);
  let errorToken = false //no error
  textControl.forEach(e => {// pour tous les inputs
    console.log(checkName.test(e.value))
    if ((e.id === "first-name" || e.id === "last-name") && !checkName.test(e.value)) {// controle du nom et prenom
      e.classList.add("text-error");
      errorToken = true
      if (e.id === "first-name") {
        alerts[0].classList.add("alert-active");
      }
      else if (e.id === "last-name") {
        alerts[1].classList.add("alert-active");
      }
    } else if ((e.id === "first-name" || e.id === "last-name") && checkName.test(e.value)) {
      e.classList.remove("text-error")
      if (e.id === "first-name") {
        alerts[0].classList.remove("alert-active");
      }
      else if (e.id === "last-name") {
        alerts[1].classList.remove("alert-active");
      }
    }
    if (e.id === "email" && !checkMail.test(e.value)) {// controle du mail
      e.classList.add("text-error");
      errorToken = true
      alerts[2].classList.add("alert-active");
    } else if (e.id === "email" && checkMail.test(e.value)) {
      e.classList.remove("text-error");
      alerts[2].classList.remove("alert-active");
    }
    if (e.id === "textarea" && !checkTextarea.test(e.value)) {// controle du champ de texte
      e.classList.add("text-error");
      errorToken = true
      alerts[3].classList.add("alert-active");
    } else if (e.id === "textarea" && checkTextarea.test(e.value)) {
      e.classList.remove("text-error");
      alerts[3].classList.remove("alert-active");
    }

  })
  if (errorToken === false) {// si tous les champs sont bons
    textControl.forEach(e => { console.log(e.id, " = ", e.value); })// console log des champs
    modalClose()//fermeture du formulaire
  }

}