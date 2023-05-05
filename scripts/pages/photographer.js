/* RÉCUPÉRER L'ID DU PHOTOGRAPHE PASSÉ EN PARAMÈTRE D'URL */
let queryParam = window.location.search;
let photographerId = queryParam.split("=");
photographerId = photographerId[1];

/*RÉCUPÉRER LES DONNÉES DU FICHIER JSON */
async function getJsonData() {
  const response = await fetch("./data/photographers.json");
  let allJsonData = await response.json();
  return allJsonData;
}

/* TROUVER LES PHOTOS QUI ONT L'ID DU PHOTOGRAPHE + AFFICHER LES INFOS DANS LE HTML*/
function displayProfilePhotographer(photographers) {
  const photographerProfil = photographers.find(
    (element) => element.id == photographerId
  );
  const h1 = document.querySelector(".fullname");
  h1.textContent = photographerProfil.name;
  const h2Modal = document.querySelector(".formTitle");
  h2Modal.textContent = "Contactez-moi " + photographerProfil.name;
  const location = document.querySelector(".location");
  location.textContent =
    photographerProfil.city + ", " + photographerProfil.country;
  const quote = document.querySelector(".quote");
  quote.textContent = photographerProfil.tagline;
  const picture = `assets/photographers/${photographerProfil.portrait}`;
  const img = document.querySelector(".profil-picture");
  img.setAttribute("src", picture);
  img.setAttribute("alt", photographerProfil.name);

  const pricePerDay = document.querySelector(".askingPrice");
  pricePerDay.textContent = photographerProfil.price + "€ / jour";
}

/* FILTRER LES PHOTOS AVEC L'ID DU PHOTOGRAPHER*/
function displayPhotographerPortfolio(sortType, media) {
  let photographerPhotos = media.filter(
    (photo) => photo.photographerId == photographerId
  );
  // envoie les photos filtrer pour les trier
  photographerPhotos = sortingMedia(sortType, photographerPhotos);

  // envoie les photos filtrer pour recupérer le nb de likes
  countLikes(photographerPhotos);

  // envoie les photos filtrer à la factory pour créer la galerie
  const gallerySection = document.querySelector(".photographer_gallery");
  gallerySection.innerHTML = "";
  photographerPhotos.forEach((photo) => {
    const portfolio = galleryFactory(photo);
    const galleryDOM = portfolio.createGalleryDOM();
    gallerySection.appendChild(galleryDOM);
  });
}

/* FONCTION POUR FILTRER LES PHOTOS AVEC LE SELECT */
function sortingMedia(sortType, media) {
  let sortedMedia;
  switch (sortType) {
    case "date":
      sortedMedia = media.sort((a, b) => {
        if (a.date < b.date) return -1;
      });
      break;

    case "title":
      sortedMedia = media.sort((a, b) => {
        if (a.title < b.title) return -1;
      });
      break;

    default:
      sortedMedia = media.sort((a, b) => {
        return b.likes - a.likes;
      });
      break;
  }
  return sortedMedia;
}

/* FONCTION POUR RÉCUPÉRER LES OBJETS DU JSON  */
async function init() {
  const { photographers } = await getJsonData();
  displayProfilePhotographer(photographers);

  const { media } = await getJsonData();
  displayPhotographerPortfolio("", media);

  const sortButton = document.getElementById("sort");
  sortButton.addEventListener("change", (event) => {
    const sortType = event.target.value;
    displayPhotographerPortfolio(sortType, media);
  });

  initLightbox();
  incrementMediaLikes();
}

init();
