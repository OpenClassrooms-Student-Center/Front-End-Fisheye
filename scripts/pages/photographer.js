import { getAllorOnePhotographer } from "../api/getPhotographer.js";
import { photographerHero } from "../templates/photographer.js";
import { getMediaCard, displayLikesContainer } from "../templates/media.js";
import { getFirstName, changeFilter } from "../utils/utils.js";
import { displayModal, closeModal } from "../utils/contactForm.js";

async function init() {
  let urlParams = new URLSearchParams(window.location.search);
  let id = parseInt(urlParams.get("id"));

  const { photographers } = await getAllorOnePhotographer(id);
  const photographer = photographers[0];

  const allLikes = photographer.media.reduce(
    (total, media) => total + media.likes,
    0
  );

  const allMedias = {
    allMedias: changeFilter(photographer.media),
    firstName: getFirstName(photographer.name),
    allLikes: allLikes,
    photographerPrice: photographer.price,
  };

  // Reorder medias
  sortMedias(allMedias);

  // Display photographer hero banner
  photographerHero(photographers[0]);

  // Display medias
  displayMedias(allMedias);

  // Display total likes container
  displayLikesContainer(allLikes, photographers[0].price);

  // Handle contact form
  handleContactForm();
}

function displayMedias(medias) {
  const mediaSection = document.querySelector(".media-section");
  mediaSection.innerHTML = "";

  medias.allMedias?.forEach((media) => {
    const { image, video, title, likes } = media;

    const mediaLink = `assets/photographers/${medias.firstName}/${image ?? video}`;

    const mediaElement = image
      ? `<img src="${mediaLink}" alt="${title}">`
      : `<video src="${mediaLink}" autoplay loop muted></video>`;

    const mediaCardProps = {
      mediaElement,
      title,
      likes,
      allMedias: medias.allMedias,
      firstName: medias.firstName,
      allLikes: medias.allLikes,
      photographerPrice: medias.photographerPrice,
      index: medias.allMedias.indexOf(media),
    };

    mediaSection.appendChild(
      getMediaCard(
        mediaCardProps
      )
    );
  });
}
function sortMedias(allMedias) {
  const filter = document.querySelector("#filter");
  filter.addEventListener("change", (event) => {
    const sort = event.target.value;
    displayMedias({
      ...allMedias,
      allMedias: changeFilter(allMedias.allMedias, sort),
    });
  });
}

function handleContactForm() {
  const contactButton = document.querySelector("#contactButton");
  contactButton.addEventListener("click", () => {
    displayModal("contact_modal");
  });

  contactButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      displayModal("contact_modal");
    }
  })

  const closeModalButton = document.querySelector("#closeForm");
  closeModalButton.addEventListener("click", () => {
    closeModal("contact_modal");
  })

  closeModalButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      closeModal("contact_modal");
    }
  })
}



init();
