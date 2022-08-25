function displayModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.querySelector("#main");
    const body = document.querySelector("body");

	modal.style.display = "block";
    //gestion de l'accessibilité sur le main et la modale
    modal.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "true");
    document.querySelector('video').setAttribute("aria-hidden", "true");
    //empeche le scroll de la page quand la modale est ouverte
    body.classList.add("no-scroll");
   
    //nom du photographe
    const fullName = document.querySelector(".flex h2").innerText; 
    //affichage du nom du photographe
    document.getElementById("h2Contact").innerHTML = "Contactez-moi </br> " + fullName; 
    //focus sur la croix de fermeture
    document.getElementById("closeForm").focus();
    
    //fermeture avec la touche echap
    modal.addEventListener('keydown', e => {
        if(e.key == "Escape") {
            closeModal();
        }
    })
    //fermeture avec la touchée entrée sur la croix de fermeture
    document.getElementById("closeForm").addEventListener('keydown', e => {
        if(e.key == "Enter") {
            closeModal();
        }
    })
    

}

function closeModal() {
    const body = document.querySelector("body");
    const main = document.querySelector("#main");
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
   
    modal.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "false");
    // Reset du formulaire
    document.forms["formContact"].reset();
    //remet le scroll de la page quand la modale est fermée
    body.classList.remove("no-scroll");

    
}

//validation du formulaire

let submit = document.querySelector("#submitContact");
let prenom ="";
let nom ="";
let email ="";
let message = "";
submit.addEventListener("click", e => {
    console.log("test")
    e.preventDefault();
    prenom = document.getElementById("inputFirstname").value;
    nom = document.getElementById("inputLastname").value;
    email = document.getElementById("inputEmail").value;
    message = document.getElementById("inputMessage").value;
    console.log("le prénom saisi est: " + prenom + " le nom saisis est: " + nom + " l'email saisi est: " + email + " le message saisi est: " + message);
    
    
   
})
