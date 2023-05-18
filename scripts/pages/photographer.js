// Import de la fonction 'photographerFactory'
import { photographerFactory } from "../factories/photographer.js";
// Import de la fonction 'mediaFactory'
import { mediaFactory } from "../factories/mediaFactory.js";
// Déclare un tableau vide pour stocker les données des photographes
let mediaPhotographer = [];
// Définit une fonction asynchrone "dataPhotographer" qui prend le paramètre "file"
async function dataPhotographer(file) {
    // Effectue une requête fetch pour obtenir les données du fichier JSON
    const response = await fetch(file);
    // Extrait les données JSON de la réponse et attend l'analyse
    const data = await response.json();
    // Retourne les données JSON analysées
    return data;
};

// Définit une fonction "foundPhotographer" qui prend les paramètres "photographers" et "id"
const foundPhotographer = (photographers, id) =>{
    // Recherche le photographe dont l'id correspond à celui passé en paramètre
    const photographer = photographers.find(photographer => photographer.id === id);
    // Retourne le photographe trouvé
    return photographer;
};


// Définit une fonction "foundMedia" qui prend les paramètres "media" et "id"
const foundMedia = (media, id) =>{
    // Filtre les médias dans le tableau "media" dont l'id correspond à celui passé en paramètre
    const mediaPhotographer = media.filter(media => media.photographerId === id);
    // Retourne les médias trouvés
    return mediaPhotographer;
};

// Définit une fonction "header" qui prend le paramètre "photographer"
function header(photographer){
    // Créer un objet photographe en utilisant la fonction "photographerFactory" et en passant le paramètre "photographer"
    const factoryPhotographer = photographerFactory(photographer);
    // Selectionne l'élement HTML avec la classe "photograph-header"
    const photographHeader = document.querySelector(".photograph-header");
    // Obtient la représentation DOM avec la méthode "getPhotographerDOM" de l'objet factoryPhotographer
    const photographerDOM = factoryPhotographer.getPhotographerDOM();
    // Extrait les élements HTML de l'objet photographerDOM
    const {div, img} = photographerDOM;
    // Sélectionne le bouton de contact avec la classe "contact_button"
    const boutonContact = document.querySelector(".contact_button");
    // Insère l'élement HTML "div" avant le bouton de contact dans la section "photographHeader"
    photographHeader.insertBefore(div, boutonContact);
    // Insère l'élement HTML "img" avant le bouton de contact dans la section "photographHeader"
    photographHeader.insertBefore(img, boutonContact.nextSibling);
    // Sélectione l'élément de la modal de contact avec l'id "contact_modal"
    const modalContact = document.getElementById("contact_modal");
    // Définit l'attribut "aria-label" de la modal de contact avec le nom du photographe
    modalContact.setAttribute("aria-label", `Contactez-moi ${photographer.name}`);
}

// Définit une fonction "displayMedias" qui prend le paramètre "mediaPhotographer" 
const totalLikes = (mediaPhotographer) =>{
    // Réduit le tableau "mediaPhotographer" en additionnant les likes de chaque média
    const total = mediaPhotographer.reduce((acc, media) => acc + media.likes, 0);
    // Retourne le total de likes
    return total;    
};

// Définit une fonction "displayLikesPrice" qui prend les paramètres "mediaPhotographer" et "photographer"
function displayLikesPrice(mediaPhotographer, photographer){
    // Appelle la fonction "totalLikes" avec le paramètre "mediaPhotographer" et stocke le résultat dans la constante "total" pour calculer le total de likes le total des likes
    const total = totalLikes(mediaPhotographer);
    // Stocke le prix du photographe dans la constante "price"
    const price = photographer.price;
    // Créer un élement HTML "div" avec la classe "likesPrice" pour afficher le prix et le total des likes
    const likesPrice = document.createElement( 'div');
    // Ajoute la classe "likesPrice" à l'élement HTML "div"
    likesPrice.classList.add('likesPrice');

    // Créer un élement HTML "p" avec la classe "pPrice" pour afficher le prix
    const pPrice = document.createElement( 'p');
    // Ajoute la classe "pPrice" à l'élement HTML "p"
    pPrice.classList.add('pPrice');

    // Créer un élement HTML "p" avec la classe "pLikes" pour afficher le total des likes
    const pLikes = document.createElement( 'p');
    // Ajoute la classe "pLikes" à l'élement HTML "p"
    pLikes.classList.add('pLikes');

    // Insère le prix dans l'élement HTML "pPrice"
    pPrice.innerHTML = `${price}€/jour`;
    // Insère le total des likes dans l'élement HTML "pLikes"
    pLikes.innerHTML = `${total} <i class="fas fa-heart"></i>`;

    // Insère les élements HTML "pLikes" et "pPrice" dans l'élement HTML "likesPrice"
    likesPrice.appendChild(pLikes);
    likesPrice.appendChild(pPrice);
    
    // Sélectionne l'élement HTML avec l'id "main"
    const main = document.querySelector("#main");
    // Insère l'élement HTML "likesPrice" dans l'élement HTML "main"
    main.appendChild(likesPrice);
};


// Définit une fonction "addFromMediaFactory" qui prend les paramètres "idPhotographer", "mediaPhotographer" et "containerMedias"
function addFromMediaFactory(idPhotographer, mediaPhotographer, containerMedias){
    // Pour chaque média dans le tableau "mediaPhotographer"
    mediaPhotographer.forEach(media => {
        // Créer un objet média en utilisant la fonction "mediaFactory" et en passant le paramètre "media" 
        media.photographerId = idPhotographer;
        // Créer un élement HTML avec la fonction "mediaFactory" et en passant le paramètre "media"
        const factoryMedia = mediaFactory(media);
        // Sélectionne l'élement HTML avec la classe "isole-heart"
        const heart = factoryMedia.querySelector('.isole-heart');
        // Insère l'élement HTML "factoryMedia" dans l'élement HTML "containerMedias"
        containerMedias.appendChild(factoryMedia);
        // Ajoute un écouteur d'événement 'click' sur l'élément "factoryMedia" qui appelle la fonction "openLightBox"
        factoryMedia.addEventListener('click', openLightBox);
        // // Ajoute un écouteur d'événement 'click' sur l'élément 'heart' pour ajouter des likes
        heart.addEventListener('click', addLikes);
        // // Ajoute un écouteur d'événement 'keydown' sur l'élément 'heart' pour ajouter des likes (accessibilité)
        heart.addEventListener('keydown', addLikes);
    });
};

// Définit une fonction "displayMedias" qui prend les paramètres "media" et "idPhotographer"
function displayMedias(media, idPhotographer){
    // Créer un élement HTML "div" avec la classe "containerMedias" pour afficher les médias
    const containerMedias = document.createElement('div');
    containerMedias.classList.add('containerMedias');
    // Sélectionne l'élement HTML avec l'id "main"
    const main = document.querySelector("main");
    // Insère l'élement HTML "containerMedias" dans l'élement HTML "main"
    main.appendChild(containerMedias);
    // Appelle la fonction "addFromMediaFactory" avec les paramètres "idPhotographer", "media" et "containerMedias"
    addFromMediaFactory(idPhotographer, media, containerMedias);
};

// Définit une fonction nommée 'createlightbox'
function createLightBox(){
    // Créer un élement HTML "dialog" avec la classe "lightbox" pour afficher la lightbox
    const lightbox = document.createElement('dialog');
    // Créer un élement HTML "div" avec la classe "lightboxContent" pour afficher le contenu de la lightbox
    const lightboxContent = document.createElement('div');
    // Créer un élement HTML "div" avec la classe "mediaLightbox" pour afficher le média dans la lightbox
    const mediaLightbox = document.createElement('div');
    // Créer un bouton pour passer au média précédent dans la Lightbox
    const previousArrow = document.createElement('button');
    // Créer un bouton pour passer au média suivant dans la Lightbox
    const nextArrow = document.createElement('button');
    // Créer un bouton pour fermer la Lightbox en appleant la fonction "createCloseButton"
    const closeButton = createCloseButton();

    // Ajout des classes et des attributs aux élements HTML
    lightbox.classList.add('lightbox');
    lightbox.setAttribute('aria-label', 'Fermerture du média');
    lightboxContent.classList.add('lightboxContent');
    mediaLightbox.classList.add('mediaLightbox');
    previousArrow.classList.add('previousArrow',"fas", "fa-angle-left");
    previousArrow.setAttribute('aria-label', 'Média précédent');
    nextArrow.classList.add('nextArrow', "fas", "fa-angle-right");
    nextArrow.setAttribute('aria-label', 'Média suivant');

    // Insère les élements HTML "closeButton", "lightboxContent", "mediaLightbox", "previousArrow" et "nextArrow" dans l'élement HTML "lightbox"
    lightboxContent.appendChild(closeButton);
    lightbox.appendChild(lightboxContent);
    lightboxContent.appendChild(mediaLightbox);
    lightboxContent.appendChild(previousArrow);
    lightboxContent.appendChild(nextArrow);

    // Insère l'élement HTML "lightbox" dans le body
    document.body.appendChild(lightbox);

    // Ajouter des écouteurs d'événements 'click' aux boutons 'previousArrow' et 'nextArrow'
    previousArrow.addEventListener('click', () => {
        clickArrow = (clickArrow - 1 + mediaPhotographer.length) % mediaPhotographer.length;
        updateLightbox(clickArrow);
    });

    nextArrow.addEventListener('click', () => {
        clickArrow = (clickArrow + 1) % mediaPhotographer.length;
        updateLightbox(clickArrow);
    });
};


// Je déclare une variable "clickArrow" qui est égale à 0 pour l'initialiser
let clickArrow = 0;

// Définit une fonction nommée 'openLightBox' qui prend un événement 'event' en paramètre
function openLightBox(event){
    // Je vérifie si l'événement 'event' est un clic sur un coeur avec la classe "isole-heart"
    if (event.target.classList.contains('isole-heart')){
        // Si oui, sortir de la fonction (ne pas ouvrir la lightbox)
        return;
    }

    // À partir de là où l'événement a eu lieu, cherchez l'élément le plus proche qui a la classe 'mediaArticle'
    const clickMedia = event.target.closest('.mediaArticle');
    //J'utilise l'identifiant du média pour trouver l'indice correspondant dans le tableau 'mediaPhotographer'
    clickArrow = mediaPhotographer.findIndex(media => media.id === parseInt(clickMedia.getAttribute('data-id')));

    // Je sélectionne la Lightbox à l'aide de la classe 'lightbox'
    const lightbox = document.querySelector('.lightbox');
    // Mise à jour la Lightbox en utilisant l'indice du média
    // L'indice du média est le numéro qui représente la position du média dans le tableau 'mediaPhotographer'
    updateLightbox(clickArrow);
    // J'ouvre la Lightbox en utilisant la méthode 'showModal'
    lightbox.showModal();
}

// Je définit une fonction 'createCloseButton' 
function createCloseButton(){
    // Création d'un bouton pour fermer la Lightbox
    const closeButton = document.createElement('button');
    // Ajout des classes et des attributs au bouton de fermeture de la Lightbox
    closeButton.classList.add('lbCloseButton', "fas", "fa-times");
    closeButton.setAttribute('aria-label', 'Fermeture du média');

    // Ajout d'un écouteur d'événement 'click' au bouton de fermeture de la Lightbox
    closeButton.addEventListener('click', () => {
        // Je sélectionne la Lightbox à l'aide de la classe 'lightbox'
        const lightbox = document.querySelector('.lightbox');
        // Je ferme la Lightbox en utilisant la méthode 'close()'
        lightbox.close();
    });

    // Je retourne le bouton de fermeture de la Lightbox
    return closeButton;

}

// Je définit une fonction 'createLightBoxContent' qui prend le paramètre 'chooseMedia'
function createLightBoxContent(chooseMedia){
    // je crée les élements HTML "div", "img", "video" et "h3" dans la Lightbox
    const lightboxLink = document.createElement('div');
    const lightboxImage = document.createElement('img');
    const lightboxVideo = document.createElement('video');
    const lightboxTitle = document.createElement('h3');

    // J'ajoute les classes aux élements HTML
    lightboxLink.classList.add('lightboxLink');
    lightboxImage.classList.add('lightboxImage');
    lightboxVideo.classList.add('lightboxVideo');
    lightboxTitle.classList.add('lightboxTitle');
    // Je définis le contenu du titre avec la propriété "title" de l'objet "chooseMedia"
    lightboxTitle.textContent = chooseMedia.title;

    // Je sélectionne la Lightbox à l'aide de la classe 'mediaLightbox'
    const mediaLightbox = document.querySelector('.mediaLightbox');
    // Je supprime le contenu de la Lightbox
    mediaLightbox.textContent = '';

    // J'ajoute des attributs aux élément "lightboxLink" et "lightboxTitle"
    lightboxLink.setAttribute("aria-label", `Média ${chooseMedia.title}`);
    lightboxLink.setAttribute("tabindex", "0");
    lightboxTitle.setAttribute("tabindex", "0");
    lightboxTitle.setAttribute("lang", "en");

    // Si "chooseMedia" contient une image
    if(chooseMedia.image){
        // Je crée un conteneur pour l'image 'div'
        const lightboxImageContainer = document.createElement('div');
        lightboxImageContainer.classList.add('lightbox-Image');

        // je définis les attributs 'src' et 'alt' de 'lightboxImage'
        lightboxImage.setAttribute('src', `assets/images/${chooseMedia.photographerId}/${chooseMedia.image}`);
        lightboxImage.setAttribute('alt', `${chooseMedia.alt}`);

        // j'ajoute 'lightboxImage' dans 'lightboxImageContainer'
        lightboxImageContainer.appendChild(lightboxImage);
        // j'ajoute 'lightboxImageContainer' dans 'lightboxLink'
        lightboxLink.appendChild(lightboxImageContainer);

    // Sinon si "chooseMedia" contient une vidéo
    } else if (chooseMedia.video){
        // Je crée un conteneur pour la vidéo 'div'
        const lightboxVideoContainer = document.createElement('div');
        lightboxVideoContainer.classList.add('lightbox-Video');

        // je définis les attributs 'src', 'alt', 'controls' et 'preload' de 'lightboxVideo'
        lightboxVideo.setAttribute('src', `assets/images/${chooseMedia.photographerId}/${chooseMedia.video}`);
        lightboxVideo.setAttribute('alt', `${chooseMedia.alt}`);
        lightboxVideo.controls = true;
        lightboxVideo.setAttribute('preload', 'metadata');

        // j'ajoute 'lightboxVideo' dans 'lightboxVideoContainer'
        lightboxVideoContainer.appendChild(lightboxVideo);
        // j'ajoute 'lightboxVideoContainer' dans 'lightboxLink'
        lightboxLink.appendChild(lightboxVideoContainer);
    }

    // J'ajoute 'lightboxLink' et 'lightboxTitle' dans 'mediaLightbox'
    mediaLightbox.appendChild(lightboxLink);
    mediaLightbox.appendChild(lightboxTitle);
}

// Je définit une fonction 'updateLightbox' qui prend le paramètre 'clickArrow'
function updateLightbox(clickArrow){
    // je sélectionne le média voulu à partir de 'médiaPhotographer' en utilisant l'indice 'clickArrow'
    const chooseMedia = mediaPhotographer[clickArrow];
    // j'appelle la fonction 'createLightBoxContent' en lui passant le paramètre 'chooseMedia' pour mette à jour la Lightbox
    createLightBoxContent(chooseMedia);
}

// Je définit une fonction 'addLikes' qui prend le paramètre 'event'
function addLikes(event){
    // Si l'événement est un 'click' ou la touche 'Entrée'
    if(event.type === "click" || event.key === "Enter"){
        event.preventDefault();
        // Je sélectionne le coeur qui a déclanché l'événement à l'aide de la classe 'heart'
        const heart = event.target;
        // Je sélectionne le nombre de likes à l'aide de la classe 'incrementLike'
        const mediaLikes = heart.parentElement.querySelector('.incrementLike');
        // Je vérifie si le coeur a l'attribut 'data-isLiked' à 'true' (incrementLike)
        const isLicked = heart.getAttribute("data-isLiked") === "true";
        // j'appelle la fonction 'updateLikes' pour mettre à jour les likes en inversant la valeur de 'isLicked'
        updateLikes(heart, mediaLikes, !isLicked);
        
    }
};

// Je définit une fonction 'updateLikes' qui prend les paramètres 'heart', 'mediaLikes' et 'isLiked'
function updateLikes(heart, mediaLikes, isLiked){
    // Je séléctionne l'élement HTML qui a la classe 'pLikes' qui affiche le nombre total de likes
    const totalLikesElement = document.querySelector('.pLikes');
    // Je convertis le contenu de 'totalLikesElement' en nombre entier
    const currentTotalLikes = parseInt(totalLikesElement.textContent);

    // je convertis le contenu de 'mediaLikes' en nombre entier
    const currentLikes = parseInt(mediaLikes.textContent);
    // Je calcul le nouveau nombre de likes en fonction de 'isLiked'
    const newLikes = isLiked ? currentLikes + 1 : currentLikes - 1;

    // je met à jour le contenu de 'mediaLikes' avec le nouveau nombre de likes
    mediaLikes.textContent = newLikes;
    // je modifie l'attribut 'data-isLiked' de 'heart' en fonction de 'isLiked'
    isLiked ? heart.setAttribute("data-isLiked", "true") : heart.setAttribute("data-isLiked", "false");
    // j'ajoute ou supprime la classe 'liked' de 'heart' en fonction de 'isLiked'
    isLiked ? heart.classList.add("liked") : heart.classList.remove("liked");

    // je définit le nom de l'événement en fonction de 'isLiked' (like ou unlike)
    const eventName = isLiked ? "like" : "unlike";
    // je crée un nouvel événement personnalisé 'mediaEvent' avec le nom de l'événement
    const mediaEvent = new CustomEvent(eventName);

    // envoie l'événement personnalisé 'mediaEvent' au document
    document.dispatchEvent(mediaEvent);
    // mise à jour du contenu de 'totalLikesElement' avec le nouveau nombre total de likes
    totalLikesElement.textContent = isLiked ? `${currentTotalLikes + 1}` : `${currentTotalLikes - 1}`;
};



// Je d'éfinis une fonction asynchrone 'init' 
async function init(){
    // je récupère les données du fichier 'photographers.json' à l'aide de la fonction 'dataPhotographer'
    const data = await dataPhotographer('../../data/photographers.json');
    // j'extrait les objets 'photographers' et 'media' de 'data'
    const {photographers, media} = data;

    // j'apppel la fonction 'createLightBox' pour créer la Lightbox
    createLightBox();

    // ajour d'une écouteur d'événement 'keydown' sur le document
    document.addEventListener('keydown', (event) => {
        // je sélectionne la Lightbox
        const lightbox = document.querySelector('.lightbox');

        // si la Lightbox est ouverte
        if(lightbox.open){
            // si la "touche" "ArrowLeft" est pressée
            if (event.key === "ArrowLeft"){
                // je décrémente 'clickArrow' pour revenir au média précédent
                clickArrow = (clickArrow - 1 + mediaPhotographer.length) % mediaPhotographer.length;
                // je met à jour la Lightbox
                updateLightbox(clickArrow);

            // sinon si la "touche" "ArrowRight" est pressée
            } else if (event.key === "ArrowRight"){
                // j'incrémente 'clickArrow' pour aller au média suivant
                clickArrow = (clickArrow + 1) % mediaPhotographer.length;
                // je met à jour la Lightbox
                updateLightbox(clickArrow);
            } 
        }
    });

    // je récupère les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    // je récupère la valeur de 'id' dans les paramètres de l'URL
    const idPhotographer = parseInt(urlParams.get('id'));

    // je trouve le photographe correspondant à 'idPhotographer' à l'aide de la fonction 'foundPhotographer'
    const photographer = foundPhotographer(photographers, idPhotographer);
    // je sélectionne l'élément HTML qui a la classe 'photographerName'
    const photographerName = document.querySelector(".photographerName");
    // je met à jour le contenu de 'photographerName' avec le nom du photographe
    photographerName.textContent = photographer.name;

    // je trouve les médias correspondant à 'idPhotographer' à l'aide de la fonction 'foundMedia'
    mediaPhotographer = foundMedia(media, idPhotographer);
    
    // j'appelle la fonction 'displayPhotographer' pour afficher les informations du photographe
    header(photographer);
    // j'affiche le nombre total de likes et le prix du photographe
    displayLikesPrice(mediaPhotographer, photographer);

    // j'affiche les médias du photographe
    displayMedias(mediaPhotographer, idPhotographer);

    // ajout des gestionnaires d'événements sur les éléments HTML qui ont la classe 'heart'
    addLikes();
    
};

// j'appelle la fonction 'init' pour initialiser la page
init();


