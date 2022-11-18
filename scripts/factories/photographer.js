function photographerFactory(data) {
    const { name, portrait, id } = data; /* J'ajoute dans ma constante "id" pour chercher les "données" correspondantes*/
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const link = document.createElement("a"); /* Constant link pour créer mon élément "a" (href) qui apparaîtra dans mon DOM*/
        link.setAttribute("href", `photographer.html?id=${id}`); /* Je set un "href" + le "lien" de la page html avec l'"id" correspondant au click */
        const article = document.createElement('article');
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
        displayDataMedia(media, currentPhotographerFirstName, photos)
    });
    displayCta(photos, photographer);// jexcecute ma fonction
    const previousArrow = document.getElementById('previousArrow');
    const nextArrow = document.getElementById('nextArrow');
    previousArrow.addEventListener('click', function(){
        goToPreviousImage(photos, currentPhotographerFirstName);   
    })
    nextArrow.addEventListener('click', function(){
        goToNextImage(photos, currentPhotographerFirstName);  
    })
};

// Dans le scope globale de mon fichier, stocker mes photos et les photographes
// pour y avoir acces partout pour ne plus le passer en parametres 
// Déféinire dans 2 variable globale dans ce fichier avec une valeur nul,
// Re exetuter cette functions en parametres 

// 1 - Ecouteru d'evenement sur mon select
// 2 - Nouvelle funtion qui vient trier par rapport aux différents critères
// 3 - Vider la galerie et la re rendre grace à ma fonction photographerMedias

function displayDataMedia(media, name, photos) {
    // console.log(media);
    // je recupere ma div parent la plus haute
    // je decortique media 
    const { image, video, title, likes, price } = media;
    const picture = `assets/sample-photos/${name}/${image}`;
    const mediaDiv = document.createElement("article");
    /*
    const thumbnailImage = document.createElement("div");
    thumbnailImage.className = "thumbnailImg";
    thumbnailImage.innerHTML= `
    <img src="assets/sample-photos/${image}">
`;
*/

    // CREER UNE DIV QUI ENGLOBE MES DEUX H2
    const divInformations = document.createElement("div");
    divInformations.className = "informationsContent";
    divInformations.innerHTML = `
        <h2 class="title">${title}</h2>
        <div class="likes">
            <h2>${likes}</h2>
            <img src="assets/heart-solid.svg" style="
            height: 15px;
            width: 18px;
            color: #901C1C;
        ">
        </div>
    `;

    // Le cas ou c'est une image
    if (media.image) {
        const mediaImg = document.createElement("img");
        mediaImg.src = picture;
        mediaDiv.appendChild(mediaImg);
        mediaDiv.appendChild(divInformations);
        mediaImg.addEventListener('click', () => {
            const photoIndex = photos.findIndex(photo => { // findIndex retrouve la position de l'element
                return photo.id === media.id;
            })
            displayLightbox(photos, photoIndex, name)
        })
     

    } else  // Le cas ou c'est une video
    {
        const mediaVideo = document.createElement("video");// balise video avec src
        const videoSrc = `assets/sample-photos/${name}/${video}`;
        mediaVideo.src = videoSrc;
        mediaVideo.setAttribute("controls", "controls")
        mediaDiv.appendChild(mediaVideo);
        mediaDiv.appendChild(divInformations);
        /*
        mediaDiv.appendChild(thumbnailImage);
        */

    }
    // afficher le titre, like ...

    // j'injestc un par un dans le DOM mediaDiv
    thumbnailSection.appendChild(mediaDiv);
};


function displayCta(photos, photographer) {
    let counterLikes = 0; // créer une variable qui vaut zéro (point de depart du compteur)
    photos.forEach((photo) => { //je boucle sur LES "photos" pour accéder à chaque "photo"
        counterLikes += photo.likes; // j'ajoute à "counterLikes" le nombre de like à ma photo courante 
    });
    // CALL TO ACTION
    const callToAction = document.querySelector(".callToAction_section");

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

// CSS modal form ||||||||||| OK

// LIGHTBOX avec +1 et -1 sur les index ||||||||||| 

   function displayLightbox(images, imageToDisplayIndex, photographerName) {
    const lightbox = document.getElementById('lightbox'); // balise <div>
    const lightboxImage = document.getElementById('lightboxImage'); // balise <img>
    const lightboxImageTitle = document.getElementById('lightboxImageTitle');
    const imageToDisplay = images[imageToDisplayIndex];
    lightboxImage.src = `assets/sample-photos/${photographerName}/${imageToDisplay.image}`; // On change la src de l'image à afficher
    lightbox.classList.add("show"); // Class CSS show ajoute la propriété display: block
    lightboxImageTitle.textContent = imageToDisplay.title;
    // stocker la position (l'index) de l'image qui vient d'etre ouverte
    lightbox.dataset.indexImage = imageToDisplayIndex;

    // Au clic sur les flêches, appeler les deux fonctions
   }
   
   function closeLightbox() {
    const lightbox = document.getElementById('lightbox'); // balise <div>
    lightbox.classList.remove("show");

   }

// Définir deux fonctions : image précédente et image suivant au CLICK
function goToPreviousImage(images, photographerName) {
    const lightbox = document.getElementById('lightbox'); // getElement la lightbox
    const indexImage = parseInt(lightbox.dataset.indexImage); // recuperr valeur de l'indexImage
    const previousImage = indexImage === 0 ? images.length - 1 : indexImage - 1 ; // soustraire à mon index
    displayLightbox(images, previousImage, photographerName);
}

function goToNextImage(images, photographerName) {
    const lightbox = document.getElementById('lightbox'); // getElement la lightbox
    const indexImage = parseInt(lightbox.dataset.indexImage); // recuperr valeur de l'indexImage
    const nextImage = indexImage === images.length - 1 ? 0 : indexImage + 1 ; // additionner à mon index
    console.log(nextImage);
    displayLightbox(images, nextImage, photographerName);
}

// Afficher les flêches


// FUNCTION LIKE POUR LES +1 DES LIKES eventListen sur les coeurs du DOM |||||||||||

// TRIER les medias par date, popularités... au clic du boutton popularité |||||||||||

/*
const getNameForm = document.querySelector('nameForm');
console.log(getNameForm);
function addPhotographerName(data) {
    console.log(addPhotographerName);
    const {name} = data;
    const h1 = document.createElement('h1');
    h1.textContent = name;
    getNameForm.appendChild(h1);
}
*/

/*
function displayLightBox (image) {

}
*/