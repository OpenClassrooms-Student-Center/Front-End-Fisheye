function formatMedias() {
  const mediaTags = document.querySelectorAll(".media-tag");

  const formattedMedias = Array.from(mediaTags).map(
    (mediaTag, index, array) => {
      const previousMedia = array[index - 1]
        ? array[index - 1]
        : array[array.length - 1];
      const nextMedia = array[index + 1] ? array[index + 1] : array[0];

      const src =
        mediaTag.nodeName === "IMG"
          ? mediaTag.getAttribute("src")
          : mediaTag.firstChild.getAttribute("src");

      return {
        id: mediaTag.getAttribute("id"),
        type: mediaTag.nodeName,
        title: mediaTag.getAttribute("alt"),
        url: src,
        previousMedia: {
          id: previousMedia.getAttribute("id"),
        },
        nextMedia: {
          id: nextMedia.getAttribute("id"),
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
  document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") {
      buildLightBox(currentMedia.previousMedia.id);
    }
  });
  nextButton.addEventListener("click", () => {
    buildLightBox(currentMedia.nextMedia.id);
  });
  document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowRight") {
      buildLightBox(currentMedia.nextMedia.id);
    }
  });
  closeButton.addEventListener("click", () => {
    closeLightBox();
  });
  closeButton.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
      closeLightBox();
    }
  });
}

function buildLightBox(mediaId) {
  const oldLightBoxContent = document.querySelector(".light-box-content");
  if (oldLightBoxContent) {
    oldLightBoxContent.remove();
  }

  const formattedMedias = formatMedias();
  const currentMedia = formattedMedias.find((media) => media.id == mediaId);

  const lightBoxModal = document.querySelector("#light-box-modal");
  lightBoxModal.innerHTML = "";

  const lightBoxContent = document.createElement("div");
  const lightBoxWrapper = document.createElement("div");
  const previousButton = document.createElement("img");
  const currentMediaContainer = document.createElement("div");
  let currentMediaTag = document.createElement("img");
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

  currentMediaTag.src = `${currentMedia.url}`;
  previousButton.src = "assets/icons/arrow-left.svg";
  nextButton.src = "assets/icons/arrow-right.svg";
  closeButton.src = "assets/icons/close-red.svg";

  currentMediaTag.setAttribute("alt", currentMedia.title);
  currentMediaTag.setAttribute("aria-label", "Image close-up view");
  previousButton.setAttribute("aria-label", "Image précédente");
  nextButton.setAttribute("aria-label", "Image suivante");
  closeButton.setAttribute("aria-label", "Fermer la lightbox");
  closeButton.setAttribute("tabindex", "0");

  if (currentMedia.type === "VIDEO") {
    const source = document.createElement("source");
    source.setAttribute("src", `${currentMedia.url}`);

    currentMediaTag = document.createElement("video");
    currentMediaTag.controls = true;
    currentMediaTag.appendChild(source);
  }

  currentMediaTitle.textContent = currentMedia.title;

  currentMediaContainer.appendChild(currentMediaTag);
  lightBoxContent.appendChild(previousButton);
  lightBoxContent.appendChild(currentMediaContainer);
  lightBoxContent.appendChild(nextButton);
  lightBoxContent.appendChild(closeButton);
  lightBoxWrapper.appendChild(lightBoxContent);
  lightBoxWrapper.appendChild(currentMediaTitle);
  lightBoxModal.appendChild(lightBoxWrapper);

  bindLightBox(previousButton, nextButton, closeButton, currentMedia);

  closeButton.focus();
}

function displayLightBox(mediaId) {
  const main = document.querySelector("main");
  main.setAttribute("aria-hidden", "true");

  const modal = document.getElementById("light-box-modal");
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");

  buildLightBox(mediaId);
}

function closeLightBox() {
  const main = document.querySelector("main");
  main.setAttribute("aria-hidden", "false");

  const modal = document.getElementById("light-box-modal");
  modal.setAttribute("aria-hidden", "true");
  modal.style.display = "none";
}