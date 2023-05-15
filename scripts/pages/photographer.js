// Importer la fonction photographerFactory() du fichier photographerFactory.js
import { photographerFactory } from "./../factories/photographerFactory.js";

// Importer la fonction MediaFactory() du fichier mediaFactory.js
import { MediaFactory } from "./../factories/mediaFactory.js";

// Importer les fonctions utilitaires du fichier utils.js
import { datas, id, photographer,  get_ID_from_url, get_name_by_id, sortbyPops, sortbyDate, sortbyTitle } from "../utils/utils.js";

// Importer la fonction displayModal depuis le fichier "utils.js
import { displayModal } from "./../utils/contactForm.js";

//Import lightbox.js
import { openLightBox,  lightboxMediaContainer, lightboxMediaSlider} from "./../utils/lightbox.js";


// Récupération des médias
const fullmedias = datas.media;

// Récupération des médias du photographe
const Usermedias = fullmedias.filter((media) => media.photographerId == id);

// Récupération des données des éléments du DOM du photographe
const photographerModel = photographerFactory(photographer);
const photographerPageDOM = photographerModel.getUserPageDOM();
const Resume = document.querySelector(".resumeContainer");
const filterBtn = document.querySelector(".filterField_select");
const filters = document.querySelectorAll(".filterField_select-list.hidden");
const _filters = Array.from(filters);
const selectLabel = document.getElementById("filterField_select-label");

filterBtn.addEventListener("click", () => {
  filterBtn.setAttribute("aria-expanded", "true");
  selectLabel.classList.add("hidden");
  filters.forEach((filter) => {
    filter.classList.remove("hidden");
  });
});







// Affichage des éléments de la page
function displayData(photograph, medias) {
  const nameShortened = get_name_by_id().split(" ")[0];
  // Récupération des éléments du DOM
  const Pheader = document.querySelector(".photograph-header");
  const Pbody = document.querySelector(".photograph-body");
  const carrouselDOM = document.createElement("div");
  carrouselDOM.classList.add("MediasContainer");

  
  // Création du corps pour les médias
  const MediasContainer = document.createElement("section");
  MediasContainer.classList.add("MediasContainer");
  Pbody.appendChild(MediasContainer);

  // Récupération des données
  const rawMedias = MediaFactory(medias);
  const mediaModels = rawMedias.mediaElements;
  const Totalizer = rawMedias.TotalizeLikes;
  const TotalLikes = document.createElement("div");
  TotalLikes.classList.add("TotalLikes");
  TotalLikes.innerHTML = `${Totalizer} <i aria-label="likes" class="fas fa-heart"></i>`;
  
  // Affichage des filtres
  filterBtn.addEventListener("toggle", () => {
    for (let filter in _filters) {
      filter.classList.remove("hidden");
          
    }
    selectLabel.classList.add("hidden");
  });

  



  // Affichage des médias
  if (medias) {
    for (let i = 0; i < mediaModels.length; i++) {
      const mediaModel = mediaModels[i];
      const mediamodelDOM = mediaModel.get_Media_Card_DOM(nameShortened);
      MediasContainer.appendChild(mediamodelDOM);
      const mediaLightdom = mediaModel.get_Media_Lightbox_DOM(nameShortened);
      console.log(lightboxMediaContainer);
      lightboxMediaSlider.appendChild(mediaLightdom);
      mediamodelDOM.onclick = () => {
        openLightBox();
        mediaLightdom.classList.add("currentMedia");
      }
      lightboxMediaSlider.style.width = `${mediaModels.length * 100}%`;
      
    }
    
  }
  if (photograph) {
    Pheader.appendChild(photographerPageDOM); // Affiche les données du photographe dans la page
    const contactbtn = document.querySelector(
      ".photographContainer .contact_button"
    );
    contactbtn.addEventListener("click", displayModal); // Affiche le formulaire de contact
    Resume.appendChild(TotalLikes);
  }
}

function init() {
  // Fonction pour afficher les données du photographe dans la page
  displayData(photographer, Usermedias);
}

init();

export { get_ID_from_url };
