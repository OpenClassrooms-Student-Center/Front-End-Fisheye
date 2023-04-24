const dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', (event) => {
    console.log(" Jai cliqué ");
});
console.log(dropdown);

document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode == 27) {
        dropdown();
    }
};


// get element byId
// function openDropdown() {
//     document.onkeydown = function (e) {
//         e = e || window.event;
//         if (e.keyCode == 13)
//         openDropdown();
//     }
// }



function photographerFactory(data) {
    const { name, portrait, id } = data; /* J'ajoute dans ma constante "id" pour chercher les "données" correspondantes*/
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const link = document.createElement("a"); /* Constant link pour créer mon élément "a" (href) qui apparaîtra dans mon DOM*/
        link.setAttribute("href", `photographer.html?id=${id}`); /* Je set un "href" + le "lien" de la page html avec l'"id" correspondant au click */
        const article = document.createElement('article');
        console.log(article);
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        link.appendChild(article); /* J'englobe mes "article"s de mon "link" */
        return (link);
    }
    return { name, picture, getUserCardDOM }
}

//add photographers 

// 1.recupe dans le dom le div parent dans lequel je veux inserer ma donnée
// 2. créer virtuellement ma futur balise (h1...)
// remplir avec text, attribut img... image = img.setAttribute("src", picture)

// .appendChild pour insérer dans le dom

// 1. 
let getDivName = document.querySelector('.name');
let getDivLocation = document.querySelector('.city');
let getDivCitation = document.querySelector('.tagline');
let getDivPicture = document.querySelector('.picture_photographer');
const thumbnailSection = document.querySelector(".thumbnail_section");

function photographerPageFactory(data) {
    const { name, country, city, tagline, portrait } = data; /* J'ajoute dans ma constante "id" pour chercher les "données" correspondantes*/
    //TITRE
    // 2
    let h1 = document.createElement('h1');
    // 3
    h1.textContent = name;
    // 4
    getDivName.appendChild(h1);

    //CITY
    let location = document.createElement('h2');
    location.textContent = city + ', ' + country;
    getDivLocation.appendChild(location);

    //TAGLINE
    let citation = document.createElement('p');
    citation.textContent = tagline;
    getDivCitation.appendChild(citation);

    //PORTRAIT
    /*const picture = `assets/photographers/${portrait}`;*/ // constant déja déclaré plus haut
    let photo = document.createElement('img');
    console.log(portrait);
    photo.setAttribute("src", `assets/photographers/${portrait}`);
    getDivPicture.appendChild(photo);

    // NAME FORM

    const getNameForm = document.querySelector("#nameForm");

    const nameForm = document.createElement("div");
    nameForm.className = "nameContent";
    nameForm.innerHTML = `
        <p>${name}</p>
        `;

    getNameForm.appendChild(nameForm);
}


// Fonction pour les MEDIAS qui sera un tableau d'objet comme sur l'index, boucle 

/**/

// data (11) est mon tableau d'objet filtré 
// media est l'objet virtuel d'une seul occruence de la boucle
// j'appelle displayDataMedia avec en parametre (media) qui est crée en bas


// Fonction qui affiche la galerie 
function photographersMedias(photos, photographer) {
    const currentPhotographerFirstName = currentPhotographer.name.split(" ")[0];
    // vider le dom
    thumbnailSection.innerHTML = ""
    //boucle sur le tableau de media (soit video soit image)
    photos.forEach((media) => {
        //j'appelle displayDataMedia avec media qui est un seul objet
        displayDataMedia(media, currentPhotographerFirstName, photos, photographer)
    });
    displayCta(photos, photographer);// jexcecute ma fonction
    const previousArrow = document.getElementById('previousArrow');
    const nextArrow = document.getElementById('nextArrow');
    previousArrow.addEventListener('click', function () {
        goToPreviousImage(photos, currentPhotographerFirstName);
    })
    nextArrow.addEventListener('click', function () {
        goToNextImage(photos, currentPhotographerFirstName);
    })


    document.onkeyup = function (e) {
        e = e || window.event;
        if (e.keyCode == 39) {
            goToNextImage(photos, currentPhotographerFirstName);
        } 
        if (e.keyCode == 37) {
            console.log('previous');
            goToPreviousImage(photos, currentPhotographerFirstName);
        }
    };
};

// Dans le scope globale de mon fichier, stocker mes photos et les photographes
// pour y avoir acces partout pour ne plus le passer en parametres 
// Déféinire dans 2 variable globale dans ce fichier avec une valeur nul,
// Re exetuter cette functions en parametres 

// 1 - Ecouteru d'evenement sur mon select
// 2 - Nouvelle funtion qui vient trier par rapport aux différents critères
// 3 - Vider la galerie et la re rendre grace à ma fonction photographerMedias

function displayDataMedia(media, name, photos, photographer) {
    // console.log(media);
    // je recupere ma div parent la plus haute
    // je decortique media 
    const { image, video, title, likes, price } = media;
    const picture = `assets/sample-photos/${name}/${image}`;
    const mediaDiv = document.createElement("article");


    // CREER UNE DIV QUI ENGLOBE MES DEUX H2
    const divInformations = document.createElement("div");
    divInformations.className = "informationsContent";
    divInformations.innerHTML = `
        <h2 tabindex="8" class="title">${title}</h2>
        <div class="likes">
            <h2>${likes}</h2>
            <img tabindex="8" src="assets/heart-solid.svg" style="
            height: 15px;
            width: 18px;
            color: #901C1C;
            cursor: pointer;
        ">
        </div>
    `;
    const likeButton = divInformations.children[1].children[1];
    const likesNumber = divInformations.children[1].children[0];
    likeButton.addEventListener('click', function () {
        if (media.liked) {
            media.likes = media.likes - 1;
            media.liked = false;
        } else {
            media.likes = media.likes + 1;
            media.liked = true;
        }
        likesNumber.innerHTML = media.likes;
        displayCta(photos, photographer)
    });


    // Le cas ou c'est une image
    if (media.image) {
        const mediaImg = document.createElement("img");
        mediaImg.src = picture;
        mediaImg.alt = title;
        mediaImg.tabIndex = "8";
        mediaDiv.appendChild(mediaImg);
        mediaDiv.appendChild(divInformations);
        mediaImg.addEventListener('click', () => {
            const photoIndex = photos.findIndex(photo => { // findIndex retrouve la position de l'element
                return photo.id === media.id;
            })
            displayLightbox(photos, photoIndex, name)
        })

        mediaImg.onkeydown = function (e) {
            e = e || window.event;
            if (e.keyCode == 13) {
                const photoIndex = photos.findIndex(photo => { // findIndex retrouve la position de l'element
                    return photo.id === media.id;
                })
                displayLightbox(photos, photoIndex, name)
            }
        }

    } else  // Le cas ou c'est une VIDEO
    {
        const mediaVideo = document.createElement("video");// balise video avec src
        const videoSrc = `assets/sample-photos/${name}/${video}`;
        mediaVideo.src = videoSrc;
        mediaVideo.alt = title;
        mediaVideo.setAttribute("controls", "controls")
        mediaDiv.appendChild(mediaVideo);
        mediaDiv.appendChild(divInformations);
        mediaVideo.addEventListener('click', () => {
            const videoIndex = photos.findIndex(video => { // findIndex retrouve la position de l'element
                return video.id === media.id;
            })
            displayLightbox(photos, videoIndex, name)
        })
        /*
        mediaDiv.appendChild(thumbnailImage);
        */

    }
    // afficher le titre, like ...

    // j'injestc un par un dans le DOM mediaDiv
    thumbnailSection.appendChild(mediaDiv);
};

// au clic du coeur (si pas liké) on vient rajouter une propriété liked de la photo
// au clic du coeur (si liké) on vient mettre la propriété liked à false et on retire un like du compteur
// booleen (true ou false)
// add prpopriété like sur la photo
// add like au compteur

// re declanche la function displayCta pour que le commpteur nous donne le bon nombre


function displayCta(photos, photographer) {
    let counterLikes = 0; // créer une variable qui vaut zéro (point de depart du compteur)
    photos.forEach((photo) => { //je boucle sur LES "photos" pour accéder à chaque "photo"
        counterLikes += photo.likes; // j'ajoute à "counterLikes" le nombre de like à ma photo courante 
    });
    // CALL TO ACTION
    const callToAction = document.querySelector(".callToAction_section");
    callToAction.innerHTML = "";

    const cta = document.createElement("div");
    cta.className = "ctaContent";
    cta.innerHTML = `
            <p class="nombreLikes">${counterLikes}</p>
            <img src="assets/heart-solid.svg" style="
            height: 15px;
            width: 18px;">
            <div class="pricePhotographer">
            <p>${photographer.price}</p>
            <p> € / jour</p>
            </div>
        `;

    callToAction.appendChild(cta);
}


// LIGHTBOX avec +1 et -1 sur les index 

function displayLightbox(images, imageToDisplayIndex, photographerName,) {
    const lightbox = document.getElementById('lightbox'); // balise <div>
    const lightboxImage = document.getElementById('lightboxImage'); // balise <img>
    const lightboxVideo = document.getElementById('lightboxVideo'); // balise <video>
    const lightboxImageTitle = document.getElementById('lightboxImageTitle');
    const imageToDisplay = images[imageToDisplayIndex];
    if (imageToDisplay.image) {
        lightboxImage.src = `assets/sample-photos/${photographerName}/${imageToDisplay.image}`; // On change la src de l'image à afficher
        lightbox.classList.add("show"); // Class CSS show ajoute la propriété display: block
        lightboxImageTitle.textContent = imageToDisplay.title;
        // stocker la position (l'index) de l'image qui vient d'etre ouverte
        lightbox.dataset.indexImage = imageToDisplayIndex;
            // Au clic sur les flêches, appeler les deux fonctions
    } else {
        lightboxVideo.src = `assets/sample-photos/${photographerName}/${imageToDisplay.image}`;
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox'); // balise <div>
    lightbox.classList.remove("show");
}

// Définir deux fonctions : image précédente et image suivant au CLICK
function goToPreviousImage(images, photographerName) {
    console.log(images);
    const lightbox = document.getElementById('lightbox'); // getElement la lightbox
    const indexImage = parseInt(lightbox.dataset.indexImage); // recuperr valeur de l'indexImage
    const previousImage = indexImage === 0 ? images.length - 1 : indexImage - 1; // soustraire à mon index
    displayLightbox(images, previousImage, photographerName);

}

function goToNextImage(images, photographerName) {
    const lightbox = document.getElementById('lightbox'); // getElement la lightbox
    const indexImage = parseInt(lightbox.dataset.indexImage); // recuperr valeur de l'indexImage
    const nextImage = indexImage === images.length - 1 ? 0 : indexImage + 1; // additionner à mon index
    console.log(nextImage);
    displayLightbox(images, nextImage, photographerName);
}




