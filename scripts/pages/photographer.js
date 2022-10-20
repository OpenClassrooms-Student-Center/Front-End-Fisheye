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

// ajout dans l'entête du protrait du photographe
// ajout de ses informations.

//Header photographer
function headerPhotographer() {
  const headerSection = document.querySelector(".photograph-header");
  headerSection.appendChild("h2");
  const h2 = document.createElement("h2");
}

async function getPhotographer(id) {
  return fetch("./data/photographers.json")
    .then((response) => response.json())
    .then((response) => {
      // console.log(response);
      let photographer = response.photographers.find((photographerData) => {
        return id == photographerData.id;
      });
      return photographer;
    });
}

async function init() {
  const photographer = await getPhotographer(243);

  console.log(photographer);
}

init();
