function addLikes(btn) {
    // Jouer animation
    // btn.style.transform = "scale(1.2)";
    // btn.style.transition = "0.2s linear";

    // Ajout +1 sur la photo
    let likePhoto = btn.parentNode.children[0];
    likePhoto.textContent++;

    // Ajout like général
    let likeTotal = document.getElementsByClassName("photograph-detail");
    likeTotal[0].children[0].children[0].textContent++;

}




