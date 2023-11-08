// Accessibilite globale au projet de cette variable notamment pour le tri
let photographerMedia;

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

    // Récupérer les médias du photographe
    photographerMedia = await fetchData("/data/photographers.json").then(
      (data) =>
        data.media.filter((media) => media.photographerId === photographerId)
    );
    // Créer le profil du photographe à partir du template
    const $main = document.getElementById("main");
    const photographerTemplate =
      photographerProfileTemplate(photographer).getUserCardHeader(
        photographerMedia
      );
    $main.appendChild(photographerTemplate);
    // Afficher le formulaire de contact
    const $btnContact = document.getElementById("contact_button");
    $btnContact.addEventListener("click", () => {
      displayModal("contact_modal");
    });

    // Utilisation de la fonction factory pour créer les médias
    const mediaInstances = photographerMedia.map(createMediaFactory);

    displayMedia(mediaInstances); // Afficher les médias

    getPhotographerName(photographer); // Récupérer le nom du photographe pour le formulaire
  }
}

// ********************************* END AFFICHAGE DU PROFIL PHOTOGRAPHE ET DE SA GALLERIE ********************************* //

// ********************************* START AFFICHAGE DU MEDIA DE LA GALLERIE ********************************* //

// Fonction pour afficher les médias dans le DOM
function displayMedia(mediaInstances) {
  const $mediaContainer = document.getElementById("media-container-main");

  $mediaContainer.innerHTML = ""; // Effacer le contenu actuel du conteneur
  // Utilisation de la fonction pour créer l'élément DOM, la card media, et l'afficher
  mediaInstances.forEach((mediaFactory) => {
    const $mediaElement = mediaFactory.createMediaTemplate();
    $mediaContainer.appendChild($mediaElement);
  });
}

// Orientation vers la fonction du tri des médias
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
  // Tri par date dans la console
  for (media of photographerMedia) {
    console.log("tri par date :", media.date);
  }

  // Afficher les médias après le tri
  const mediaInstancesSorted = photographerMedia.map(createMediaFactory);
  displayMedia(mediaInstancesSorted);
}
// ********************************* END AFFICHAGE DU MEDIA DE LA GALLERIE ********************************* //
