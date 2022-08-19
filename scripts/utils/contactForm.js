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
    document.getElementById("closeForm").focus(); //marche mais n'affiche pas le focus
    
    //fermeture avec la touche echap
    modal.addEventListener('keydown', e => {
        if(e.key == "Escape") {
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
