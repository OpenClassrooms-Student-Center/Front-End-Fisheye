export class MediaFactory {
  constructor(portrait) {
    this.picture = `../assets/photographers/${portrait}`;
  }

  getMediasCardDOM(name, image, video, title, id, likes) {
    const card = document.createElement("article");

    let picture, mediaHtml;

    if (image?.endsWith(".jpg")) {
      picture = `assets/images/${name}/${image}`;
      mediaHtml = `<img lightbox-media="${title}" src="${picture}" alt="${title}" tabIndex="0" />`;
    } else if (video?.endsWith(".mp4")) {
      picture = `assets/images/${name}/${video}`;
      mediaHtml = `<video lightbox-media="${title}" src="${picture}" tabIndex="0"></video>`;
    }

    card.innerHTML = `
      <div class="card" id="card">
        ${mediaHtml}
        <div class="containerInfos">
          <h2>${title}</h2>
          <div class="containerLikes_i">
            <span class="totalLikes" id="like-${id}">${likes}</span>
            <i id="heart-${id}" class="fa-solid fa-heart heart" aria-label="likes" tabIndex="0"></i>
          </div>
        </div>
      </div>
    `;

    const containerCards = document.getElementById("containerCards");
    containerCards.append(card);

    const heartId = document.getElementById(`heart-${id}`);
    const likeClass = document.getElementById(`like-${id}`);

    heartId.addEventListener("click", () => {
      if (likeClass.classList.contains("likes")) {
        // If the element has already been liked, remove the like
        likeClass.classList.remove("likes");
        likes -= 1;
      } else {
        // Otherwise, add a like
        likeClass.classList.add("likes");
        likes += 1;
      }

      // Update the text of the element with the total likes
      likeClass.innerText = likes;
    });

    return card;
  }
}