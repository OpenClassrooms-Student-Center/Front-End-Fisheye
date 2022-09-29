import Api from './class/Api.js';
import Photographer from './class/Photographer.js';
import FormContact from './class/FormContact.js';
import Media from './class/Media.js';
import CardInfos from './class/CardInfos.js';
import SortDropDownSelector from './class/SortDropDownSelector.js';

/* ENG: Targets */
/* FRA: Cibles */

const photographerTarget = document.getElementById('photographer-profile');
const mediaTarget = document.getElementById('gallery');
const cardInfosTarget = document.getElementById('card-infos');
const sortTarget = document.getElementById('sort');

/* ENG: Functions */
/* FRA: Fonctions */

const dispatch = (element, target) => {
  if (element.id === target.id) {
    target.parentNode.replaceChild(element, target);
  } else {
    target.appendChild(element);
  }
};

const getParam = (param) => {
  const search = window.location.search;
  const result = new URLSearchParams(search).get(param);

  if (result != null) {
    return result;
  }

  return false;
};

/* ENG/FRA: Api initialization */

try {
  await Api.init();
} catch (error) {
  console.log(error);
}

/* ENG: Retrieve the photographer id from the get params */
/* FR: Récuperation de l'id du photographe provenant du parametre de la méthode GET */
const photographerId = getParam('id');

/* ENG: Create the photographer element */
/* FR: Création de l'element photographe */
const photographer = new Photographer(Api.getPhotographerById(photographerId));

/* ENG: Inject photographer */
/* FRA: Injecter du photographe */
Photographer.instances.forEach(photographer => {
  dispatch(photographer.element, photographerTarget);
});

const sort = new SortDropDownSelector();

dispatch(sort.getView(), sortTarget);

/* ENG: Get photographer's media */
/* FRA: Obtenir les media d'un photographe */
const medias = Api.getPhotographerMedia(photographerId);

medias.forEach(media => new Media(media, mediaTarget));

Media.sortBy(SortDropDownSelector.value);

const cardInfos = new CardInfos(photographer.price);

dispatch(cardInfos.getView(), cardInfosTarget);

/* ENG: Contact Form Initialization */
/* FR: Initialisation du formulaire de contact */
FormContact.initialization();
