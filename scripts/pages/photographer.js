//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographerById(id) {
        const response = await fetch('../../data/photographers.json');
        const photographersData = await response.json();

        const photographers = photographersData.photographers;
        const photographermedia = photographersData.media;
        const photographer = photographers.find((photographer) => photographer.id === id);
        let media = photographermedia.filter((item) => item.photographerId === id);
        
        return { photographer, media};
    } 

async function displayPhotographer(photographer) {
    const headerSection = document.querySelector(".photograph-header");
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    headerSection.appendChild(userCardDOM);
}

async function displayNameForm(photographer) {
    const formTitle = document.querySelector(".form_title");
    const formTitleModel = photographerTemplate(photographer);
    const formTitleCardDOM = formTitleModel.getnameFormDom();
    formTitle.appendChild(formTitleCardDOM);
}

async function displayMedia(media) {
    const mediaSection = document.querySelector(".photographer_media");
    media.forEach((media) =>{
        const mediaModel = phototographerMedia(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
    });
}

async function displayTotalLikes(media){
    likes = media.map(media => media.likes);
    let inilikes = 0;
    let totalLikes = likes.reduce((accumulator, currentValue) => accumulator + currentValue, inilikes);

    const totalLikesSection = document.querySelector(".photographer_likes_price");
    const likeModel = phototographerMedia(media);
    const likeCardDOM = likeModel.getTotallikes();
    totalLikesSection.appendChild(likeCardDOM);
    const labelTotallikes = document.getElementById('total-likes')
    labelTotallikes.textContent = totalLikes;

    function toggleLike(event) {
        
        // Récupérer l'élément HTML qui a déclenché l'événement (le bouton cliqué)
        const likeButton = event.target;
        // Récupérer l'identifiant unique du bouton
        var postId = likeButton.id;
        // Récupérer l'élément HTML qui affiche le nombre de likes pour ce post
        var likesElement = document.getElementById(postId + "-likes");
        // Récupérer le nombre actuel de likes en tant que nombre entier
        var currentLikes = parseInt(likesElement.textContent);

        // Vérifier si le bouton a la classe "liked"
        if (likeButton.classList.contains("liked")) {
          // Si le bouton a la classe "liked", décrémenter le nombre de likes et retirer la classe "liked"
          currentLikes--;
          totalLikes--;
          likeButton.classList.remove("liked");
        } else {
          // Si le bouton n'a pas la classe "liked", incrémenter le nombre de likes et ajouter la classe "liked"
          currentLikes++;
          totalLikes++;
          likeButton.classList.add("liked");
        }

        // Mettre à jour le texte de l'élément HTML avec le nouveau nombre de likes pour ce post
        likesElement.textContent = currentLikes;

        // Mettre à jour le texte de l'élément HTML avec le total des likes
        document.getElementById("total-likes").textContent = totalLikes;

    }

    // Ajouter un gestionnaire d'événements à tous les éléments avec la classe "like-button"
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(function(button) {
        button.addEventListener('click', toggleLike)
    });
}

async function display(photographer, media) {
    displayPhotographer(photographer)
    displayNameForm(photographer)
    displayMedia(media)
    displayTotalLikes(media)
}

async function init() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("id");

    const { photographer, media } = await getPhotographerById(parseInt(id));
        display(photographer, media)
}

init();

