// Importer la fonction photographerFactory() du fichier photographerFactory.js
import { photographerFactory } from "./../factories/photographerFactory.js";

// Importer la fonction MediaFactory() du fichier mediaFactory.js
import { MediaFactory } from "./../factories/mediaFactory.js";

// Importer la fonction getPhotographers() du fichier photographerFactory.js
import { get_Datas } from "./../utils/get_datas.js";

// Importer la fonction displayModal depuis le fichier "utils.js
import { displayModal } from "./../utils/contactForm.js";

//Import lightbox.js
import { openLightBox,  lightboxMediaContainer, lightboxMediaSlider} from "./../utils/lightbox.js";

// Fonction pour récupérer l'id du photographe dans l'url
function get_ID_from_url() {
  let url = window.location.search; // Récupère l'url
  let urlParams = new URLSearchParams(url); // Récupère les paramètres de l'url
  let id = urlParams.get("id"); // Récupère l'id de l'url
  return id;
}

function get_name_by_id() {
  // Fonction pour récupérer le nom du photographe par son id
  let photographer = photographers.find(
    (photographer) => photographer.id == id
  ); // Récupère les données du photographe
  let fullname = photographer.name; // Récupère le nom du photographe
  const Pname = fullname.split(" ")[0]; // Récupère le prénom du photographe
  return Pname;
}


// Récupération de l'id du photographe dans l'url
const id = get_ID_from_url();

// Récupération des données brutes
const datas = await get_Datas();

// Récupération des photographes
const photographers = datas.photographers;

// Récupération des médias
const fullmedias = datas.media;

// Récupération des donnes  du photographe selon l'id de la page 
const photographer = photographers.find(
  (photographer) => photographer.id == id
);

// Récupération des médias du photographe
const Usermedias = fullmedias.filter((media) => media.photographerId == id);

// Récupération des données des éléments du DOM du photographe
const photographerModel = photographerFactory(photographer);
const photographerPageDOM = photographerModel.getUserPageDOM();
const Resume = document.querySelector(".resumeContainer");

// Affichage des éléments de la page
function displayData(photograph, medias) {
  const nameShortened = get_name_by_id().split(" ")[0];
  // Récupération des éléments du DOM
  const Pheader = document.querySelector(".photograph-header");
  const Pbody = document.querySelector(".photograph-body");
  const carrouselDOM = document.createElement("div");
  carrouselDOM.classList.add("MediasContainer");

  // Création du champ de filtre
  const filterField = document.createElement("section");
  filterField.classList.add("filterField");
  filterField.innerHTML = "Trier par :";
  Pbody.appendChild(filterField);

  // Création du bouton de filtre
  const filterbtn = document.createElement("button");
  filterbtn.id = "filterbtn";
  filterbtn.setAttribute("role", "aria-listbox");
  filterField.appendChild(filterbtn);

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
