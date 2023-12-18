import { getData } from "../pages/dataJson.js";
import MediaTemplate from "../templates/mediaTemplate.js";

export default async function getCaroussel(photographer, media, mediaElement) {
  // geting dom Caroussel Elements
  const lightBox = document.getElementById("lightBoxModal");
  const mediaSection = document.getElementById("mediaSection");

  // eslint-disable-next-line no-shadow
  let mediaIndex = media.findIndex((media) => media.id === mediaElement.id);

  // eslint-disable-next-line no-use-before-define
  afficherMedia();

  function afficherMedia() {
    let carousselMedia = "";

    // setting img if image
    if (media[mediaIndex].image) {
      carousselMedia = document.createElement("img");
      carousselMedia.setAttribute(
        "src",
        `assets/media/${photographer.name.substr(
          0,
          photographer.name.indexOf(" "),
        )}/${media[mediaIndex].image}`,
      );
      carousselMedia.setAttribute("alt", `image ${media[mediaIndex].title}`);
      carousselMedia.setAttribute("role", "img");
      carousselMedia.setAttribute("class", "carousselImg");
      carousselMedia.setAttribute("class", "carousselMedia");
    } else {
      // setting video if video
      carousselMedia = document.createElement("video");
      carousselMedia.setAttribute(
        "src",
        `assets/media/${photographer.name.substr(
          photographer.name.indexOf(" "),
        )}/${media[mediaIndex].video}`,
      );
      carousselMedia.setAttribute("alt", `video ${media[mediaIndex].title}`);
      carousselMedia.setAttribute("class", "mediaVideo");
      carousselMedia.setAttribute("class", "carousselMedia");
      carousselMedia.setAttribute(`controls`, ``);

      // implementing media in mediaSection
    }

    // setting title
    const mediaName = document.createElement("figcaption");
    mediaName.textContent = media[mediaIndex].title;
    // displaying mediaSection
    mediaSection.appendChild(carousselMedia);
    mediaSection.appendChild(mediaName);
  }
  // displaying caroussel

  // creating eventListeners
  const previousButton = document.getElementById("leftButton");
  previousButton.setAttribute("class", "carousselButton");
  const forwardButton = document.getElementById("rightButton");
  forwardButton.setAttribute("class", "carousselButton");
  const closeButton = document.getElementById("closeButton");
  closeButton.setAttribute("class", "carousselButton");
  previousButton.addEventListener("click", () => {
    if (mediaIndex > 0) {
      mediaSection.innerHTML = "";
      // eslint-disable-next-line no-plusplus
      mediaIndex--;
      afficherMedia();
    }
  });

  forwardButton.addEventListener("click", () => {
    if (mediaIndex < media.length - 1) {
      mediaSection.innerHTML = "";
      // eslint-disable-next-line no-plusplus
      mediaIndex++;
      afficherMedia();
    }
  });
  closeButton.addEventListener("click", () => {
    mediaSection.innerHTML = "";
    lightBox.style.display = "none";
    // eslint-disable-next-line no-use-before-define
    main.style.display = "block";
  });
  // opening Caroussel
  lightBox.style.display = "flex";
  const main = document.getElementById("main");
  main.style.display = "none";
}
