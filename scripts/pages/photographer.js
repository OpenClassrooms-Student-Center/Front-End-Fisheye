//Mettre le code JavaScript lié à la page photographer.html

// AU total, 59 photographes dans le Json

// function permettant de revenir a la page d'accueil en cliquant sur le logo.

const indexLogo = document.querySelector(".logo");
indexLogo.onclick = function () {
  location.href = "index.html";
};
indexLogo.style.cursor = "pointer";

function setFocusToElements() {
  document.htmlElement().focus;
  console.log(setFocusToElements);
}

// ajout dans l'entête du portrait du photographe
// ajout de ses informations.

// import {photographerFactory} from "scripts/factories/photographer.js";

// la fonction Header photographer dont le paramêtre est photographerData crée les éléments suivants
function headerPhotographer(photographerData) {
  // créer un header
  const headerSection = document.querySelector(".photograph-header");
  const { city, country, name, tagline, portrait, price, id } =
    photographerData;
  //  variable nommé titre aura une valeur = création d'un élément balisé h1
  const titre = document.createElement("h1");
  // ajoute un élément enfant à mon headerSection qui sera le titre
  headerSection.appendChild(titre);
  // le titre aura comme contenu le name de mon paramêtre photographerData
  titre.innerText = photographerData.name;
  // variable nommé cityAndCountry aura une valeur = création d'un élément balisé div
  const cityAndCountry = document.createElement("div");
  // ajoute un élément enfant à mon headerSection qui sera le cityAndCountry
  headerSection.appendChild(cityAndCountry);
  // le cityAndCountry aura comme contenu le city, le string ", " et le country de mon paramêtre photographerData
  cityAndCountry.innerText =
    photographerData.city + ", " + photographerData.country;
  // variable nommé descriptionPhotographer aura une valeur = création d'un élément balisé div
  const descriptionPhotographer = document.createElement("div");
  // ajoute un élément enfant à mon headerSection qui sera le cityAndCountry
  headerSection.appendChild(descriptionPhotographer);
  // le cityAndCountry aura comme contenu le city, le string ", " et le country de mon paramêtre photographerData
  descriptionPhotographer.innerText = photographerData.tagline;
  // variable nommé profilPicturePhotographer aura une valeur = création d'un élément balisé img
  const profilPicturePhotographer = document.createElement("img");
  profilPicturePhotographer.className;
  const picture2 = `assets/photographersMini/${portrait}`;
  // ajoute un élément enfant à mon headerSection qui sera le profilPicturePhotographer
  headerSection.appendChild(profilPicturePhotographer);
  // le profilPicturePhotographer aura comme contenu le portrait de mon paramêtre photographerData
  profilPicturePhotographer.setAttribute("src", picture2);

  console.log(profilPicturePhotographer.src);
  //
}

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
// chargé de recuperer les données
async function getPhotographer(id) {
  return (
    fetch("./data/photographers.json")
      // Ici, then() transforme le résultat en objet js array
      .then((response) => response.json())
      // Ici, then() aveec le find va récupérer un seul photographe avec l'id correspondant
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
