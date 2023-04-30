function formatMedias() {
  const mediaTags = document.querySelectorAll(".media-tag");

  const formattedMedias = Array.from(mediaTags).map(
    (mediaTag, index, array) => {
      const previousMedia = array[index - 1]
        ? array[index - 1]
        : array[array.length - 1];
      const nextMedia = array[index + 1] ? array[index + 1] : array[0];

      return {
        id: mediaTag.getAttribute("id"),
        title: mediaTag.getAttribute("alt"),
        url: mediaTag.getAttribute("src"),
        previousMedia: {
          id: previousMedia.getAttribute("id"),
          title: previousMedia.getAttribute("alt"),
          url: previousMedia.getAttribute("src"),
        },
        nextMedia: {
          id: nextMedia.getAttribute("id"),
          title: nextMedia.getAttribute("alt"),
          url: nextMedia.getAttribute("src"),
        },
      };
    }
  );

  return formattedMedias;
}

function bindLightBox(previousButton, nextButton, closeButton, currentMedia) {
  previousButton.addEventListener("click", () => {
    buildLightBox(currentMedia.previousMedia.id);
  });
  nextButton.addEventListener("click", () => {
    buildLightBox(currentMedia.nextMedia.id);
  });
  closeButton.addEventListener("click", () => {
    closeLightBox();
  });
}

async function buildLightBox(mediaId) {
  const formattedMedias = formatMedias();
  const currentMedia = formattedMedias.find((media) => media.id == mediaId);

  const lightBoxModal = document.querySelector("#light-box-modal");
  lightBoxModal.innerHTML = "";

  const lightBoxContent = document.createElement("div");
  const previousButton = document.createElement("img");
  const currentMediaContainer = document.createElement("div");
  const currentMediaTag = document.createElement("img");
  const currentMediaTitle = document.createElement("h3");
  const nextButton = document.createElement("img");
  const closeButton = document.createElement("img");

  lightBoxContent.classList.add("light-box-content");
  previousButton.classList.add("previous-button");
  currentMediaContainer.classList.add("current-media-container");
  currentMediaTag.classList.add("current-media");
  currentMediaTitle.classList.add("current-media-title");
  nextButton.classList.add("next-button");
  closeButton.classList.add("close-light-box-button");

  previousButton.src = "assets/icons/arrow-left.svg";
  currentMediaTag.src = `${currentMedia.url}`;
  nextButton.src = "assets/icons/arrow-right.svg";
  closeButton.src = "assets/icons/close-red.svg";

  currentMediaTitle.textContent = currentMedia.title;

  currentMediaContainer.appendChild(currentMediaTag);
  currentMediaContainer.appendChild(currentMediaTitle);
  lightBoxContent.appendChild(previousButton);
  lightBoxContent.appendChild(currentMediaContainer);
  lightBoxContent.appendChild(nextButton);
  lightBoxContent.appendChild(closeButton);
  lightBoxModal.appendChild(lightBoxContent);

  bindLightBox(previousButton, nextButton, closeButton, currentMedia);
}

function displayLightBox(mediaId) {
  const modal = document.getElementById("light-box-modal");
  modal.style.display = "flex";
  buildLightBox(mediaId);
}

function closeLightBox() {
  const modal = document.getElementById("light-box-modal");
  modal.style.display = "none";
}
