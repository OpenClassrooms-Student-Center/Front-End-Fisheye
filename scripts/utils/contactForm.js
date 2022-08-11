function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    const fullName = document.querySelector(".flex h2").innerText; //nom du photographe
    document.getElementById("h2Contact").innerHTML = "Contactez-moi </br> " + fullName; //affichage du nom du photographe

    
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
