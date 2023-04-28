// async function getPhotographer() {
//   const response = await fetch("data/photographers.json");
//   const data = await response.json();
//   const photographers = data.photographers;
//   const urlParams = new URL(document.location).searchParams;
//   const id = urlParams.get("id");
//   return photographers.find((photographer) => photographer.id == id);
// }

// async function getMedia(mediaId) {
//   const photographer = await getPhotographer();
//   const photographerModel = photographerFactory(photographer);
//   const medias = await photographerModel.getMedias();
//   const media = medias.find((media) => media.id == mediaId);
//   return media;
// }

// function likeMedia(mediaId) {
//   const media = document.querySelector(`.media[data-id="${mediaId}"]`);
//   const mediaModel = mediaFactory(media);
//   mediaModel.like();
// }
