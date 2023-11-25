/* eslint-disable no-param-reassign */
/* eslint-disable operator-linebreak */
/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
function createMediaFactory(data) {
  let liked = false; // Ajout d'une variable pour suivre l'état de like

  function createMediaTemplate() {
    const $mediaElement = document.createElement("article");
    $mediaElement.setAttribute("aria-labelledby", `mediaTitle_${data.id}`);
    $mediaElement.classList.add("media-card");

    const isVideo = data.video;
    const mediaSource = isVideo ? data.video : data.image;

    $mediaElement.innerHTML = `
    <figure class="media-card">
      ${
        isVideo
          ? `<video tabindex="0">
              <source src="assets/galleries/${mediaSource}" type="video/mp4">
              Votre navigateur ne supporte pas ce média.
            </video>`
          : `<img src="assets/galleries/${mediaSource}" alt="${data.title}" tabindex="0"/>`
      }
      <figcaption class="media-card-description">
        <h2 id="mediaTitle_${data.id}">${data.title}</h2>
        <p>
          <span id="likeButton" role="button" tabindex="0" class="${
            liked ? "liked" : ""
          }" aria-label="J'aime">
            <i class="fa-solid fa-heart"></i>
          </span>           
          <span id="likeCount">${data.likes}</span>
        </p>
      </figcaption>
    </figure>
  `;

    // Ajout d'un gestionnaire d'événements sur le media pour affichage de la modal lightbox
    $mediaElement.addEventListener("click", (event) => {
      // Vérifier si l'élément cliqué est l'image ou la vidéo
      const isImageOrVideo =
        event.target.tagName === "IMG" || event.target.tagName === "VIDEO";

      // Si c'est l'image ou la vidéo, déclencher la fonction
      if (isImageOrVideo) {
        displayModal("lightbox_modal");
        displayLightBoxContent(data.id);
      }
    });
    // Ajout d'un gestionnaire d'événements pour la touche "Enter"
    $mediaElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        // Vérifier si l'élément sélectionné est l'image ou la vidéo
        const isImageOrVideo =
          document.activeElement.tagName === "IMG" ||
          document.activeElement.tagName === "VIDEO";

        // Si c'est l'image ou la vidéo, déclencher la fonction
        if (isImageOrVideo) {
          displayModal("lightbox_modal");
          displayLightBoxContent(data.id);
        }
      }
    });
    function updateLikes() {
      // Mettre à jour le texte avec le nouveau nombre de likes
      const $likeCount = $mediaElement.querySelector("#likeCount");
      $likeCount.textContent = data.likes;

      // Calcul du nombre total de likes
      const $totalLikes = document.querySelector(
        ".popularity-section > h3:nth-child(1) > span:nth-child(1)"
      );
      $totalLikes.textContent =
        parseInt($totalLikes.textContent, 10) + (liked ? 1 : -1);
    }
    // Ajout d'un gestionnaire d'événements sur le bouton de like
    function handleLikeClick() {
      liked = !liked; // Inverser l'état de liked
      data.likes += liked ? 1 : -1; // Mettre à jour le nombre de likes en fonction de liked
      updateLikes(); // Mettre à jour l'icône et le nombre de likes
    }
    const $likeButton = $mediaElement.querySelector("#likeButton");
    $likeButton.addEventListener("click", handleLikeClick);

    // Incrémentation au clavier
    function handleLikeClickKeyboard(event) {
      const isEnterKey = event.key === "Enter";
      if (isEnterKey) {
        handleLikeClick();
      }
    }
    $likeButton.addEventListener("keydown", handleLikeClickKeyboard);

    return $mediaElement;
  }

  return { createMediaTemplate };
}
