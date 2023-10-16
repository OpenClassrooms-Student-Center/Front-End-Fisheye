import { onOpenPic } from "../utils/photoModal.js"; // Import openModalBtn here

class Lightbox {
  constructor(media, photographer) {
    this._media = media;
    this._photographer = photographer;
  }
  createLightbox(media) {
    console.log(media);

    const modalContent = document.querySelector("#modalContent");
    const modalPic = document.querySelector(".modal-picture");
    // Create a <p> element for the media title
    const mediaTitleElement = document.createElement("h2");
    mediaTitleElement.innerHTML = media.title;

    modalContent.appendChild(mediaTitleElement);

    modalPic.src = imagePath;
    onOpenPic(media);
    // console.log("media.id", media.id);
    // const imgClick = document.querySelector(`#media-img-${media.id}`);
    //on image click set area hidden false

    //on image click set data to modal
    // const setData = (media) => {
    //   // console.log("mediaClicked", media);
    // };

    // imgClick.onclick = setData();

    // onOpenPic(media);
  }
}
export { Lightbox };
