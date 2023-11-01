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
    const photographerMedia = await fetchData("/data/photographers.json").then(
      (data) =>
        data.media.filter((media) => media.photographerId === photographerId)
    );

    // Utilisation de la fonction factory pour créer les médias
    const mediaInstances = photographerMedia.map(createMediaFactory);

    // Afficher les médias
    displayMedia(mediaInstances);
  }
}

// ********************************* END AFFICHAGE DU PROFIL PHOTOGRAPHE ET DE SA GALLERIE ********************************* //

// ********************************* START AFFICHAGE DU MEDIA DE LA GALLERIE ********************************* //

// Fonction factory pour créer les médias
function createMediaFactory(data) {

  return {
    createMediaElement: function () {
      const isVideo = data.video;

      const $mediaElement = document.createElement("article");
      $mediaElement.classList.add("media-card");

      if (isVideo) {
        $mediaElement.classList.add("video");
        $mediaElement.innerHTML = `
          <div class="media-card">
            <video controls>
              <source src="assets/galleries/${data.video}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="media-card-description">
            <p>${data.title}</p>
            <p>${data.likes} <i class="fa-solid fa-heart"></i></p>
          </div>
        `;
      } else {
        $mediaElement.innerHTML = `
          <div class="media-card">
            <img src="assets/galleries/${data.image}" alt="${data.title}" />
          </div>
          <div class="media-card-description">
            <p>${data.title}</p>
            <p>${data.likes} <i class="fa-solid fa-heart"></i></p>
          </div>
        `;
      }

      return $mediaElement;
    },
  };
}

// Fonction pour afficher les médias dans le DOM
function displayMedia(mediaInstances) {
  const $mediaContainer = document.getElementById("media-container-main");

  // Utilisation de la fonction pour créer l'élément DOM, la card media, et l'afficher
  mediaInstances.forEach((mediaFactory) => {
    const $mediaElement = mediaFactory.createMediaElement();
    $mediaContainer.appendChild($mediaElement);
  });
}
// ********************************* END AFFICHAGE DU MEDIA DE LA GALLERIE ********************************* //
