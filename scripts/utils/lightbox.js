/**
 * Fonction qui crée et intègre le contenu de la lightbox
 * @param {string} source - source de l'image à afficher
 * @param {string} type - type de l'image à afficher
 * @param {string} id - identifiant de l'image à afficher
 * @param {object} lightbox - lightbox
 * @param {string} option - une string "next" ou "prev"
 */
function lightboxContent(source, type, id, lightbox) {
  //Création de la div de la lightbox de fermeture
  const close = document.createElement("button");
  close.classList.add("lightbox__close");
  close.addEventListener("click", () => closeLightbox());
  //Création de la div de la lightbox suivant
  const next = document.createElement("button");
  next.classList.add("lightbox__next");
  next.addEventListener("click", () => nextLightbox(source, id));
  //Création de la div de la lightbox précédent
  const prev = document.createElement("button");
  prev.classList.add("lightbox__prev");
  prev.addEventListener("click", () => prevLightbox(source, id));
  //Écouteur d'événement pour les touches clavier
  document.addEventListener("keydown", keydown, false);
  function keydown(e) {
    if (e.code == "ArrowRight") {
      nextLightbox(source, id);
    } else if (e.code == "ArrowLeft") {
      prevLightbox(source, id);
    } else if (e.code == "Escape") {
      closeLightbox();
    }
    document.removeEventListener("keydown", keydown, false); //évite la redondance
  }
  //Création de la div de la lightbox de l'image
  const container = document.createElement("div");
  container.classList.add("lightbox__container");
  //Création de l'image ou la vidéo
  const content =
    type == "image"
      ? document.createElement("img")
      : document.createElement("video");
  type == "video" && content.setAttribute("controls", true);
  type == "video" && content.setAttribute("autoplay", true);
  content.setAttribute("src", source);
  content.classList.add("thumbnail");
  // Accroche les éléments créés
  lightbox.appendChild(close);
  lightbox.appendChild(next);
  lightbox.appendChild(prev);
  lightbox.appendChild(container);
  container.appendChild(content);
}

/**
 * Fonction qui retourne la lightbox en objet HTML
 * @param {string} source - source de l'image à afficher
 * @param {string} type - type de l'image à afficher
 * @param {string} id - identifiant de l'image à afficher
 * @return {HTML} lightbox [HTML object]
 */
function lightbox(source, type, id) {
  //Crée la div global de la lightbox
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");
  // Crée et ajoute le contenu de la lightbox
  lightboxContent(source, type, id, lightbox);
  return lightbox;
}

/**
 * Fonction qui affiche la lightbox dans le DOM
 * @param {string} source - source de l'image à afficher
 * @param {string} type - type de l'image à afficher
 * @param {string} id - identifiant de l'image à afficher
 */
async function showLightbox(source, type, id) {
  document.getElementById("main").appendChild(lightbox(source, type, id));
}

/* BOUTONS */

/**
 *  Function qui ferme la lightbox
 */
function closeLightbox() {
  document.querySelector(".lightbox").remove();
}

/**
 *  Function qui affiche l'image suivante dans la lightbox
 * @param {string} source - source de l'image affichée
 * @param {string} id - identifiant de l'image affichée
 */
function nextLightbox(source, id) {
  lightboxNextPrev(source, id, "next");
}

/**
 *  Function qui affiche l'image précédente dans la lightbox
 * @param {string} source - source de l'image affichée
 * @param {string} id - identifiant de l'image affichée
 */
function prevLightbox(source, id) {
  lightboxNextPrev(source, id, "prev");
}

/**
 * Function qui affiche l'image suivante ou précédente dans la lightbox
 * @param {string} source - source de l'image affichée
 * @param {string} id - identifiant de l'image affichée
 * @param {string} option - une string "next" ou "prev"
 */
async function lightboxNextPrev(source, id, option) {
  // Récupère un tableau de tous les médias (objets)
  const { mediaFiltered } = await getPhotographer();
  // Sélectionne l'index du média qui est affiché
  let mediaIndex = await mediaFiltered.findIndex((media) => media.id == id);
  // Incrémente ou Décrémente mediaIndex
  option == "next" ? mediaIndex++ : mediaIndex--;
  // Vérifie que nous ne sommes pas en début ou en fin de tableau
  const max = mediaFiltered.length;
  const min = -1;
  if (mediaIndex == min) {
    mediaIndex = max - 1;
  } else if (mediaIndex == max) {
    mediaIndex = 0;
  }
  // Récupère le nouveau media avec tous ses attributs
  const newMedia = mediaFiltered[mediaIndex];
  // * Récupère le type du nouveau media
  const newMediaType = newMedia.image ? "image" : "video";
  // * Récupère la source du nouveau media
  const newMediaName =
    newMediaType == "image" ? newMedia.image : newMedia.video;
  const newMediaSource = "assets/" + source.split("/")[1] + "/" + newMediaName;
  // * Récupère l'id du nouveau media
  const newMediaId = newMedia.id;
  // Récupère l'élément DOM lightbox
  const recupLightbox = document.querySelector(".lightbox");
  // ! Vide la lightbox
  document.querySelector(".lightbox").innerHTML = "";
  // Crée et ajoute le nouveau contenu de la lightbox
  lightboxContent(newMediaSource, newMediaType, newMediaId, recupLightbox);
}
