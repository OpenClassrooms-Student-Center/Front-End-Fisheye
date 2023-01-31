/*  Fonction mediaFactory pr la data */
function mediaFactory(data) {
  const { id, image, likes, price, title, date, photographerId, video } = data;

  /* fonction pr obtenir les medias des photographes */
  function getPhotographerMediaCards() {
    const mediaCard = document.createElement("div");
    mediaCard.classList.add("media-card");

    /* gestion des img */
    if (image) {
      mediaCard.innerHTML = `
            <img class="media-miniature" src="../../assets/images/medias/${image}" alt="Image de ${title}"/>
            <div class="media-infos">
                <span class="title">${title}</span>
                <span class="likes">
                    <span>${likes}</span> <i aria-label="likes" class="fa-solid fa-heart"></i>
                </span>
            </div>
            `;
      return mediaCard;
    }

    /* gestion des videos */
    if (video) {
      mediaCard.innerHTML = `
            <video class="media-miniature" autoplay>
                <source src="../../assets/images/medias/${video}" type="video/mp4">
                <p>Impossible d'afficher ce media sur votre navigateur.</p>
            </video>
            <div class="media-infos">
                <span class="title">${title}</span>
                <span class="likes">
                    <span>${likes}</span> <i aria-label="likes" class="fa-solid fa-heart"></i>
                </span>
            </div>
            `;
      return mediaCard;
    }
  }

  return { getPhotographerMediaCards };
}
