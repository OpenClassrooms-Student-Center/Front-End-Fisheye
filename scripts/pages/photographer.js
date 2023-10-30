// La classe de base pour les médias
class Media {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
  }

  // Méthode pour créer un élément DOM représentant le média
  getMediaElement() {
    const $mediaElement = document.createElement("div");
    $mediaElement.innerHTML = `
          <!-- Structure HTML de la carte média -->
          <div class="media-card">
            <img src="assets/photographers/${this.image}" alt="${this.title}">
            <p>${this.title}</p>
            <p>${this.likes} Likes</p>
            <p>${this.date}</p>
            <p>${this.price}€</p>
          </div>
        `;
    return $mediaElement;
  }
}

// La classe pour les photos, héritant de la classe Media
class Photo extends Media {
  constructor(data) {
    super(data);
    this.image = data.image;
  }
}

// La classe pour les vidéos, héritant de la classe Media
class Video extends Media {
  constructor(data) {
    super(data);
    this.video = data.video;
  }
}

// Factory Method pour créer les médias en fonction du type de données
function createMedia(data) {
  if (data.image) {
    return new Photo(data);
  } else if (data.video) {
    return new Video(data);
  }
}

// Fonction asynchrone pour récupérer les données depuis un fichier JSON
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Fonction principale pour initialiser la page du photographe
async function initPhotographerPage() {
  const photographerId = getPhotographerIdFromURL();

  if (photographerId) {
    // Récupérer les données du photographe
    const photographer = await fetchData("/data/photographers.json").then(
      (data) => data.photographers.find((p) => p.id === photographerId)
    );

    // Créer le template du photographe
    const photographerTemplate = photographerDetailTemplate(photographer);
    displayPhotographerHeader(photographerTemplate);

    // Récupérer les médias du photographe
    const photographerMedia = await fetchData("/data/photographers.json").then(
      (data) =>
        data.media.filter((media) => media.photographerId === photographerId)
    );

    // Créer les instances de médias en utilisant le Factory Method
    const mediaInstances = photographerMedia.map(createMedia);

    // Afficher les médias
    displayMedia(mediaInstances);
  }
}

// Fonction pour récupérer l'ID du photographe depuis l'URL
function getPhotographerIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get("id"), 10);
}

// Fonction pour afficher le template du photographe dans le DOM
function displayPhotographerHeader(photographerTemplate) {
  const $main = document.getElementById("main");
  $main.innerHTML = photographerTemplate;
}

// Fonction pour afficher les médias dans le DOM
function displayMedia(mediaInstances) {
  const $mediaContainer = document.getElementById("media-container");

  mediaInstances.forEach((media) => {
    const $mediaElement = media.getMediaElement();
    $mediaContainer.appendChild($mediaElement);
  });
}

// Appeler la fonction principale pour initialiser la page du photographe
initPhotographerPage();
