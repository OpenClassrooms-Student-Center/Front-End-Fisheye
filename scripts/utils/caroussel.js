// import { getData } from "../pages/dataJson.js";
// import MediaTemplate from "../templates/mediaTemplate.js";

export default async function getCaroussel(photographer, media, mediaElement) {
  // geting dom Caroussel Elements
  const lightBox = document.getElementById("lightBoxModal");
  const mediaSection = document.getElementById("mediaSection");

  // eslint-disable-next-line no-shadow
  let mediaIndex = media.findIndex((media) => media.id === mediaElement.id);
  let carousselMedia = "";
  // eslint-disable-next-line no-use-before-define
  afficherMedia();

  function afficherMedia() {
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
          0,
          photographer.name.indexOf(" "),
        )}/${media[mediaIndex].video}`,
      );
      carousselMedia.setAttribute("alt", `video ${media[mediaIndex].title}`);
      carousselMedia.setAttribute("class", "mediaVideo");
      carousselMedia.setAttribute("class", "carousselMedia");
      carousselMedia.setAttribute("id", "video");
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

  // implementing left section event listeners
  previousButton.addEventListener("click", () => {
    if (mediaIndex > 0) {
      mediaSection.innerHTML = "";
      // eslint-disable-next-line no-plusplus
      mediaIndex--;
      afficherMedia();
    }
  });

  previousButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (mediaIndex > 0) {
        mediaSection.innerHTML = "";
        // eslint-disable-next-line no-plusplus
        mediaIndex--;
        afficherMedia();
        document.getElementById("centerSection").focus();
      }
    }
  });

  // implementing right section event listeners
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
  // inclusive listeners
  forwardButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (mediaIndex < media.length - 1) {
        mediaSection.innerHTML = "";
        // eslint-disable-next-line no-plusplus
        mediaIndex++;
        afficherMedia();
        document.getElementById("centerSection").focus();
      }
    }
  });
  closeButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      mediaSection.innerHTML = "";
      lightBox.style.display = "none";
      // eslint-disable-next-line no-use-before-define
      main.style.display = "block";
    }
  });
  // zooming on video
  const focusMedia = document.getElementById("centerSection");
  focusMedia.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      document.getElementById("video").focus();
    }
  });

  // opening Caroussel
  lightBox.style.display = "flex";
  const main = document.getElementById("main");
  main.style.display = "none";
}
