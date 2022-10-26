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

function photographerPageFactory(data) {
    const { name, country, city, tagline, portrait} = data; /* J'ajoute dans ma constante "id" pour chercher les "données" correspondantes*/
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
}


// Fonction pour les MEDIAS qui sera un tableau d'objet comme sur l'index, boucle 

/**/

// data (11) est mon tableau d'objet filtré 
// media est l'objet virtuel d'une seul occruence de la boucle
// j'appelle displayDataMedia avec en parametre (media) qui est crée en bas



function photographersMedias(data, name) {
   // console.log(name);
    //boucle sur le tableau de media (soit video soit image)
    data.forEach((media) => {
        //j'appelle displayDataMedia avec media qui est un seul objet
        displayDataMedia (media, name)
    });
};


function displayDataMedia(media, name) {
   // console.log(media);
    // je recupere ma div parent la plus haute
    const thumbnailSection = document.querySelector(".thumbnail_section");
    // je decortique media 
    const {image, video, id, title, likes, date } = media;
    const picture = `assets/sample-photos/${name}/${image}`;
    const mediaDiv = document.createElement("article");
    // CREER UNE DIV QUI ENGLOBE MES DEUX H2
    /* const divUnderImage = document.querySelector(".under_image"); /* ESSAI */
   // console.log(divUnderImage);
    const titleMedia = document.createElement("h2");
    titleMedia.textContent = title;
    const likesMedia = document.createElement("h2");
    likesMedia.textContent = likes;

    /*
    const faviconMedia = document.createElement('span');
    const favicon = `assets/${heart-solid.svg}`;
    console.log(favicon)
    faviconMedia.src = favicon;
    */
    const cta = document.querySelector("callToAction_section");
    const ctaDiv = document.createElement("h2");
   /*
    totalLikes.textContent = likes;
    ctaDiv.appendChild (cta);
    */



   // Le cas ou c'est une image
   if (media.image) {
    const mediaImg = document.createElement("img");
    mediaImg.src = picture;
    mediaDiv.appendChild (mediaImg);
    mediaDiv.appendChild (titleMedia);
    mediaDiv.appendChild (likesMedia);

   
   // const thumnailImage = document.createElement("article");
   // thumnailImage.appendChild ()


   } else  // Le cas ou c'est une video
 {
    const mediaVideo = document.createElement("video");// balise video avec src
    const videoSrc = `assets/sample-photos/${name}/${video}`;
    mediaVideo.src = videoSrc;
    mediaVideo.setAttribute("controls","controls")   
    mediaDiv.appendChild(mediaVideo);
   }
    // afficher le titre, like ...

    // j'injestc un par un dans le DOM mediaDiv
   thumbnailSection.appendChild(mediaDiv, titleMedia , likesMedia);
   /*divUnderImage.appendChild(titleMedia, likesMedia);*/
};




/////////
document.body.onload = addElement;

function addElement() {
  // create a new div element
  const newDiv = document.createElement("div");

  // and give it some content
  const newContent = document.createTextNode("Hi there and greetings!");

  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);
}

////////

// CALL TO ACTION
function ctaElement() {
    console.log('toto')
    //const cta = document.createElement("h2");
}

//////////
const nameForm = document.getElementById('nameForm');
nameForm.innerHTML += 'Extra stuff';

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