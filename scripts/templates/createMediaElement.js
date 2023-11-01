// Fonction factory pour créer les médias
function createMediaFactory(data) {
  function createMediaElement() {
    const $mediaElement = document.createElement("article");
    $mediaElement.classList.add("media-card");

    const isVideo = data.video;
    const mediaSource = isVideo ? data.video : data.image;

    $mediaElement.innerHTML = `
        <div class="media-card">
          ${
            isVideo
              ? `<video>
                  <source src="assets/galleries/${mediaSource}" type="video/mp4">
                  Votre navigateur ne supporte pas ce média.
                </video>`
              : `<img src="assets/galleries/${mediaSource}" alt="${data.title}" />`
          }
        </div>
        <div class="media-card-description">
          <p>${data.title}</p>
          <p>${data.likes} <i class="fa-solid fa-heart"></i></p>
        </div>
      `;

    return $mediaElement;
  }

  return { createMediaElement };
}
