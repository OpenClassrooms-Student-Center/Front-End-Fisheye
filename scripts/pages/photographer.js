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

//Header photographer
function headerPhotographer(photographerData) {
  const headerSection = document.querySelector(".photograph-header");
  const titre = document.createElement("h1");
  headerSection.appendChild(titre);
  titre.innerText = photographerData.name;
}

init();

async function init() {
  // créer une const qui récupère l'id grâce à l'url
  // console.log("window Location:", window.location);
  const photographersValue = window.location.search;
  // console.log(" photographers values:", photographersValue );
  const urlParams = new URLSearchParams(photographersValue);
  const param1Id = urlParams.get("id");
  console.log("voici l'id de ce photographe :", param1Id);
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
