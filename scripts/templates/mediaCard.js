
import MediasFactory from "../factories/MediasFactory"

function mediaCard(data) {
    
const mediaImage = data.map(media => new MediasFactory(media, image) )
const mediaVideo = data.map(media => new MediasFactory(media, video) )

const allMedias = mediaImage.concat(mediaVideo)

    allMedias.forEach(media => {
        const mediaCard = document.createElement("div");
        mediaCard.classList.add("photograph-media");

        const mediaContent = media.image
        ? ` <img class="" src="./assets/photographers/${photographer.name}/${media.image}" alt="${media.alt}">`
        : ` <video class="" aria-label="${media.alt}">
                <source src="./assets/photographers/${photographer.name}/${media.video}" type="video/mp4">
            </video>`;

        mediaCard.innerHTML =
         `${mediaContent}
          <div class="media-text">
            <h2 class="media-title">${media.title}</h2>
            <span class="media-like">${media.likes} likes</span>
          </div>
        `;
})
}
return mediaCard();
