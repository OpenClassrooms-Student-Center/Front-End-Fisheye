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
  const photographerModel = photographerDetailFactory(photographer, photos);
  photographerModel.getPhotographersInfo()

  const photosSection = document.querySelector(".photos_info");

  photosSection.innerHTML = ''
  photos.forEach((photo, index) => {
    let mediaDOM;
    if (photo.image) {
      mediaDOM = photographerModel.getPhotoDOM(index, photo, photos);
    } else {
      mediaDOM = photographerModel.getVideoDOM(index, photo)
    }
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

async function init() {



  // Récupère les datas des photographes
  const { photographer, photos } = await getPhotographerDetail();

  const selectSort = document.getElementById("sort_select");
  selectSort.onchange = function (e) {
    sortData(selectSort.value, photos, photographer)
  }

  displayData(photographer, photos)
};

