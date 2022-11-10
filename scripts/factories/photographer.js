// import {createMediaCard} from '../scripts/template/mediaCards.js'
// envoyer function createMediaCar dans son dossier
// chargé de recuperer les données
init();
async function init() {
  // créer une const qui récupère l'id grâce à l'url
  // console.log("window Location:", window.location);
  const photographersValue = window.location.search;
  // console.log(" photographers values:", photographersValue );
  const urlParams = new URLSearchParams(photographersValue);
  const param1Id = urlParams.get("id");
  // console.log("voici l'id de ce photographe :", param1Id);
  const photographer = await getPhotographer(param1Id);
  console.log(photographer);
  headerPhotographer(photographer);
}
async function getPhotographer(id) {
  return (
    fetch("./data/photographers.json")
      // Ici, then() transforme le résultat en objet js array
      .then((response) => response.json())
      // Ici, then() avec le find va récupérer un seul photographe avec l'id correspondant
      .then((response) => {
        // console.log(response);
        let photographer = response.photographers.find((photographerData) => {
          // le return id sera correct s'il correspond à l'id qu'on l'on cherche dans le json
          return id == photographerData.id;
        });
        return photographer;
      })
  );
}

// la fonction photographerFactory a pour paramêtre data (le photographers.json)
function photographerFactory(data) {
  const { city, country, name, tagline, portrait, price, id } = data;
  // console.log(price);

  const picture = `assets/photographersMini/${portrait}`;
  // la fonction getUserCardDOM permet :
  function getUserCardDOM() {
    const article = document.createElement("article");
    article.onclick = function () {
      location.href = `photographer.html?id=${id}`;
    };
    // create the image element
    const img = document.createElement("img");
    article.appendChild(img);
    img.style.borderRadius = "100%";
    img.style.objectFit = "cover";
    article.style.cursor = "pointer";

    img.setAttribute("src", picture);
    img.alt = name;
    const h2 = document.createElement("h2");
    h2.textContent = name;
    article.appendChild(h2);
    const divCityAndCountry = document.createElement("div");
    divCityAndCountry.textContent = city + ", " + country;
    article.appendChild(divCityAndCountry);
    divCityAndCountry.style.color = "#901c1c";
    const divTagLine = document.createElement("div");
    divTagLine.textContent = tagline;
    article.appendChild(divTagLine);
    divTagLine.style.color = "black";
    divTagLine.style.fontSize = "13px";
    const divPrice = document.createElement("div");
    divPrice.textContent = price + "€/jour";
    article.appendChild(divPrice);
    divPrice.style.color = "#4D4D4D";
    divPrice.style.fontSize = "13px";
    // retourne à l'article
    return article;
  }
  return { name, picture, getUserCardDOM };
}

// création du headerPhotograph
function headerPhotographer(photographerData) {
  const headerSection = document.querySelector(".photograph-header");
  // base de donnée.
  const { city, country, name, tagline, portrait, price, id } =
    photographerData;
  const titre = document.createElement("h1");
  titre.innerText = photographerData.name;
  const cityAndCountry = document.createElement("div");
  cityAndCountry.innerText =
    photographerData.city + ", " + photographerData.country;
  const descriptionPhotographer = document.createElement("div");
  descriptionPhotographer.innerText = photographerData.tagline;
  const profilPicturePhotographer = document.createElement("img");
  profilPicturePhotographer.className += "imgPhotoPage";
  const picture2 = `assets/photographersMini/${portrait}`;
  headerSection.appendChild(profilPicturePhotographer);
  profilPicturePhotographer.setAttribute("src", picture2);
  //console.log(profilPicturePhotographer.src);
  // header
  const contentHeader = document.createElement("div");
  contentHeader.className += "contentHeader";
  headerSection.appendChild(contentHeader);
  contentHeader.appendChild(titre);
  contentHeader.appendChild(cityAndCountry);
  contentHeader.appendChild(descriptionPhotographer);
  // media card
  const main = document.querySelector("#main");
  // console.log(main);
  const sectionMedia = document.createElement("div");
  sectionMedia.className += "sectionMedia";
  main.appendChild(sectionMedia);
  const mediaFilter = document.createElement("div");
  mediaFilter.className += "mediaFilter";
  sectionMedia.appendChild(mediaFilter);
  const articleMedia = document.createElement("div");
  articleMedia.className += "articleMedia";
  sectionMedia.appendChild(articleMedia);

  // je veux récupérer les médias et les afficher 

}

// function mediaCard(mediaData) {
//   // base de donnée.
//   const { id, photographerId, title, image, likes, date, price } = mediaData;
//   console.log(mediaData);
//   //// création de la mediaCard
//   // const photoId = `assets/FishEye_Photos/Sample Photos${}`
//
//   // créer le lien qui permettra d'accéder aux id des médias
//   // Ici on va créer une variable qui ordennera
//   // de récupérer les images et les video dans le dossier SAMPLE PHOTOS
//   articleMedia.setAttribute("src", picture2);
// }

// async function getMedia(id) {
//   return (
//     fetch("./data/photographers.json")
//       // Ici, then() transforme le résultat en objet js array
//       .then((response) => response.json())
//       // Ici, then() avec le find va récupérer un seul photographe avec l'id correspondant
//       .then((response) => {
//         console.log(response);
//         let media = response.media.find((mediaData) => {
//           // le return id sera correct s'il correspond à l'id qu'on l'on cherche dans le json
//           return id == mediaData.id;
//         });
//         return media;
//       })
//   );
// }

// init2();
// async function init2() {
//   // créer une const qui récupère l'id grâce à l'url
//   // console.log("window Location:", window.location);
//   const mediaValue = window.location.search;
//   // console.log(" photographers values:", photographersValue );
//   const urlParams = new URLSearchParams(mediaValue);
//   const param1Id = urlParams.get("id");
//   // console.log("voici l'id de ce photographe :", param1Id);
//   const media = await getMedia(param1Id);
//   console.log(media);
//   mediaCard(media);
// }
