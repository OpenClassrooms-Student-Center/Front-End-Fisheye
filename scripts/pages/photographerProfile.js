// Accessibilite globale au projet de cette variable notamment pour le tri
let photographerMedia;
function sortMedia(sortBy) {
  switch (sortBy) {
    case "popularity":
      photographerMedia = sortByPopularity(photographerMedia);
      break;
    case "date":
      photographerMedia = sortByDate(photographerMedia);
      break;
    case "title":
      photographerMedia = sortByTitle(photographerMedia);
      break;
    default:
      break;
  }
  // Afficher les médias après le tri
  const mediaInstancesSorted = photographerMedia.map(createMediaFactory);
  displayMedia(mediaInstancesSorted);
}
// Appeler la fonction principale pour initialiser la page du photographe
initPhotographerPage();

// ********************************* START AFFICHAGE DU PROFIL PHOTOGRAPHE ET DE SA GALLERIE ********************************* //

// Fonction principale pour initialiser la page du photographe
async function initPhotographerPage() {
  const photographerId = getParameterFromURL("id");

  if (photographerId) {
    // Récupérer les données du photographe
    const photographer = await fetchData("/data/photographers.json").then(
      (data) => data.photographers.find((p) => p.id === photographerId)
    );

    // Créer le profil du photographe à partir du template
    const $main = document.getElementById("main");
    const photographerTemplate =
      photographerProfileTemplate(photographer).getUserCardHeader();
    $main.appendChild(photographerTemplate);

    // Récupérer les médias du photographe
    photographerMedia = await fetchData("/data/photographers.json").then(
      (data) =>
        data.media.filter((media) => media.photographerId === photographerId)
    );
    // Utilisation de la fonction factory pour créer les médias
    const mediaInstances = photographerMedia.map(createMediaFactory);

    // Afficher les médias
    displayMedia(mediaInstances);

    // Récupérer le nom du photographe pour le formulaire
    getPhotographerName(photographer);
  }
}

// ********************************* END AFFICHAGE DU PROFIL PHOTOGRAPHE ET DE SA GALLERIE ********************************* //

// ********************************* START AFFICHAGE DU MEDIA DE LA GALLERIE ********************************* //

// Fonction pour afficher les médias dans le DOM
function displayMedia(mediaInstances) {
  const $mediaContainer = document.getElementById("media-container-main");
  // Effacer le contenu actuel du conteneur
  $mediaContainer.innerHTML = "";
  // Utilisation de la fonction pour créer l'élément DOM, la card media, et l'afficher
  mediaInstances.forEach((mediaFactory) => {
    console.log("mediaFactory:", mediaFactory);
    const $mediaElement = mediaFactory.createMediaElement();
    $mediaContainer.appendChild($mediaElement);
  });
}
// ********************************* END AFFICHAGE DU MEDIA DE LA GALLERIE ********************************* //
