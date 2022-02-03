/**
 * Récupére les informations et les photos du photographe
 * @returns 
 */
async function getPhotographerDetail() {

  //l'accès le fichier json
  const data = await fetch("../data/photographers.json")
  const json = await data.json();
  var url = new URL(window.location.href);
  const photographerId = url.searchParams.get("id");

  return ({
    //chercher le photographe par son id
    photographer: json.photographers.find(p => p.id == photographerId),
    //chercher ses photos par son id
    photos: json.media.filter(m => m.photographerId == photographerId)
  })
}

/**
 * Crée les elements HTML de la page photographe
 * @param {*} photographer 
 * @param {*} photos 
 */
async function displayData(photographer, photos) {
  //Afficher les informations du photographe
  const profileInfo = document.getElementById("profile-info")
  profileInfo.innerHTML = ''
  const photographerProfile = new PhotographerFactory(photographer, 'banner', photos);
  profileInfo.appendChild(photographerProfile);

  //Afficher les photos et les videos du photographe

  const photosSection = document.querySelector(".photos_info");
  photosSection.innerHTML = ''

  photos.forEach((media, index) => {
    let mediaDOM;
    mediaDOM = new MediaFactory(photographer, index, media, photos);
    photosSection.appendChild(mediaDOM);
  });
};

/**
 * Permets de trier les photos en fonction du choix de l'utilisateur
 * @param {*} sortId 
 * @param {*} listOfPhotos 
 * @param {*} photographer 
 */
function sortData(sortId, listOfPhotos, photographer) {
  switch (sortId) {
    case "0":
      listOfPhotos = listOfPhotos.sort((a, b) => b.likes - a.likes);
      break;
    case "1":
      listOfPhotos = listOfPhotos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      break;
    case "2":
      listOfPhotos = listOfPhotos.sort((a, b) => a.title.localeCompare(b.title));

      break;

    default:
      break;
  }

  displayData(photographer, listOfPhotos)

}

/**
 * Defini l'evenement de click pour chaque option de tri
 * @param {*} photos 
 * @param {*} photographer 
 */
function initSort(photos, photographer) {
  const popularityItem = document.getElementById("popularity");
  const dateItem = document.getElementById("date");
  const titleItem = document.getElementById("title");
  const sortDropList = document.getElementById("sortDropList");

  popularityItem.onclick = function () {
    sortData("0", photos, photographer)
    sortDropList.innerHTML = "Popularité";
  }
  dateItem.onclick = function () {
    sortData("1", photos, photographer)
    sortDropList.innerHTML = "Date";

  }
  titleItem.onclick = function () {
    sortData("2", photos, photographer)
    sortDropList.innerHTML = "Titre";

  }

}

/**
 * Initialisation de la page
 */
async function init() {

  const { photographer, photos } = await getPhotographerDetail();

  initSort(photos, photographer)

  displayData(photographer, photos)
};