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
    const photographerTemplate = photographerProfileTemplate(photographer);
    $main.appendChild(photographerTemplate);

    // Récupérer les médias du photographe
    const photographerMedia = await fetchData("/data/photographers.json").then(
      (data) =>
        data.media.filter((media) => media.photographerId === photographerId)
    );

    // Utilisation de la fonction factory pour créer les médias
    const mediaInstances = photographerMedia.map(createMedia);

    // Afficher les médias
    displayMedia(mediaInstances);
  }
}

// ********************************* END AFFICHAGE DU PROFIL PHOTOGRAPHE ET DE SA GALLERIE ********************************* //

// ********************************* START AFFICHAGE DU MEDIA DE LA GALLERIE ********************************* //

// Fonction factory pour créer les médias
function createMedia(data) {
  const commonData = {
    id: data.id,
    photographerId: data.photographerId,
    title: data.title,
    likes: data.likes,
    date: data.date,
    price: data.price,
  };

  if (data.image) {
    return {
      ...commonData,
      type: "photo",
      source: `assets/galleries/${data.image}`,
    };
  } else if (data.video) {
    return {
      ...commonData,
      type: "video",
      source: `assets/galleries/${data.video}`,
    };
  }
}

// Fonction pour créer l'élément DOM, la card média
function createMediaElement(media) {
  const $mediaElement = document.createElement("article");
  const isVideo = media.type === "video";

  $mediaElement.innerHTML = `
      <div class="media-card ${isVideo ? "video" : ""}">
        <img src="${media.source}" alt="${media.title}" />
      </div>
        <div class="media-card-description">
            <p>${media.title}</p>
            <p>${media.likes} <i class="fa-solid fa-heart"></i></p>
        </div>
    `;
  return $mediaElement;
}

// Fonction pour afficher les médias dans le DOM
function displayMedia(mediaInstances) {
  const $mediaContainer = document.getElementById("media-container-main");

  // Utilisation de la fonction pour créer l'élément DOM, la card media, et l'afficher
  mediaInstances.forEach((media) => {
    const $mediaElement = createMediaElement(media);
    $mediaContainer.appendChild($mediaElement);
  });
}
// ********************************* END AFFICHAGE DU MEDIA DE LA GALLERIE ********************************* //
