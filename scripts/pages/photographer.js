//Mettre le code JavaScript lié à la page photographer.htmlasync function getPhotographers() {
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

async function displayData(photographer, photos) {
  const photographerModel = new PhotographerFactory(photographer, 'info', photos);

  const photosSection = document.querySelector(".photos_info");

  photosSection.innerHTML = ''
  photos.forEach((media, index) => {
    let mediaDOM;
    mediaDOM = new MediaFactory(photographer, index, media, photos);
    photosSection.appendChild(mediaDOM);
  });
};

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

function initSort(photos, photographer) {
  const popularityItem = document.getElementById("popularity");
  const dateItem = document.getElementById("date");
  const titleItem = document.getElementById("title");
  const sortDropList = document.getElementById("sortDropList");

  popularityItem.onclick = function (e) {
    sortData("0", photos, photographer)
    sortDropList.innerHTML = "Popularité";
  }
  dateItem.onclick = function (e) {
    sortData("1", photos, photographer)
    sortDropList.innerHTML = "Date";

  }
  titleItem.onclick = function (e) {
    sortData("2", photos, photographer)
    sortDropList.innerHTML = "Titre";

  }

}

async function init() {



  // Récupère les datas des photographes
  const { photographer, photos } = await getPhotographerDetail();

  initSort(photos, photographer)

  displayData(photographer, photos)
};

/*
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // TODO: cacher le formulaire
})
*/