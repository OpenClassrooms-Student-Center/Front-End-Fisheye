function createMediaFactory(data) {
  let liked = false; // Ajout d'une variable pour suivre l'état de like

  function createMediaElement() {
    const $mediaElement = document.createElement("article");
    $mediaElement.setAttribute("aria-labelledby", `mediaTitle_${data.id}`);
    $mediaElement.classList.add("media-card");

    const isVideo = data.video;
    const mediaSource = isVideo ? data.video : data.image;

    $mediaElement.innerHTML = `
    <figure class="media-card">
      ${
        isVideo
          ? `<video>
              <source src="assets/galleries/${mediaSource}" type="video/mp4">
              Votre navigateur ne supporte pas ce média.
            </video>`
          : `<img src="assets/galleries/${mediaSource}" alt="${data.title}" />`
      }
      <figcaption class="media-card-description">
        <p id="mediaTitle_${data.id}">${data.title}</p>
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

    // Ajout d'un gestionnaire d'événements sur le media pour affichage lightbox
    $mediaElement.addEventListener("click", () => {
      displayModal("lightbox_modal");
    });
    // Ajout d'un gestionnaire d'événements sur le bouton de like
    const $likeButton = $mediaElement.querySelector("#likeButton");
    $likeButton.addEventListener("click", handleLikeClick);

    function handleLikeClick() {
      liked = !liked; // Inverser l'état de liked
      data.likes += liked ? 1 : -1; // Mettre à jour le nombre de likes en fonction de liked
      updateLikes(); // Mettre à jour l'icône et le nombre de likes
    }

    // Incrémentation au clavier
    $likeButton.addEventListener("keydown", handleLikeClickKeyboard);
    function handleLikeClickKeyboard(event) {
      const isEnterKey = event.key === "Enter";
      isEnterKey && handleLikeClick();
    }

    function updateLikes() {
      // Mettre à jour le texte avec le nouveau nombre de likes
      const $likeCount = $mediaElement.querySelector("#likeCount");
      $likeCount.textContent = data.likes;

      // Calcul du nombre total de likes
      const $totalLikes = document.querySelector(
        ".popularity-section > p:nth-child(1) > span:nth-child(1)"
      );
      $totalLikes.textContent =
        parseInt($totalLikes.textContent) + (liked ? 1 : -1);
    }

    return $mediaElement;
  }

  return { createMediaElement };
}
