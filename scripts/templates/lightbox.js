import { closeModal, displayModal } from "../utils/utils.js";
import { createMedia } from "../factory/media.js";

function displayLightbox(index, mediasSorted, firstName) {
  const lightboxClose = document.querySelector(".lightbox-close");
  const rightArrow = document.querySelector("#right-arrow");
  const leftArrow = document.querySelector("#left-arrow");

  displayModal("lightbox");

  displayLightboxTemplate();

  rightArrow.addEventListener("click", () => {
    if (index === mediasSorted.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
    displayLightboxTemplate();
  });

  rightArrow.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      if (index === mediasSorted.length - 1) {
        index = 0;
      } else {
        index += 1;
      }
      displayLightboxTemplate();
    }
  });

  leftArrow.addEventListener("click", () => {
    if (index === 0) {
      index = mediasSorted.length - 1;
    } else {
      index -= 1;
    }
    displayLightboxTemplate();
  });

  leftArrow.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      if (index === 0) {
        index = mediasSorted.length - 1;
      } else {
        index -= 1;
      }
      displayLightboxTemplate();
    }
  });

  lightboxClose.addEventListener("click", () => {
    closeModal("lightbox");
  });

  lightboxClose.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      closeModal("lightbox");
    }
  });

  addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal("lightbox");
    }

    if (event.key === "ArrowRight") {
      if (index === mediasSorted.length - 1) {
        index = 0;
      } else {
        index += 1;
      }
      displayLightboxTemplate();
    }

    if (event.key === "ArrowLeft") {
      if (index === 0) {
        index = mediasSorted.length - 1;
      } else {
        index -= 1;
      }
      displayLightboxTemplate();
    }
  });

  function displayLightboxTemplate() {
    const mediaContent = document.querySelector(".media-content");

    const mediaElement = new createMedia({...mediasSorted[index], firstname: firstName}).createMediaElement();

    mediaContent.innerHTML = `
          <div class="lightbox-picture">
            ${mediaElement}
            <div class="lightbox-infos">
              <h3>${mediasSorted[index].title}</h3>
            </div>
          </div>
      `;
  }

  return {
    displayLightboxTemplate,
  };
}

export function lightBox(index, mediasSorted, firstName) {
  displayLightbox(index, mediasSorted, firstName);
}
