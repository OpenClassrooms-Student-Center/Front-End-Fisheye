import getCaroussel from "../utils/caroussel.js";


export default async function MediaTemplate(photographer, media, mediaElement) {



  const mediaArticle = document.createElement("article");
  mediaArticle.setAttribute("class", "mediaArticle");

  // implementing mediaDataSection
  const mediaDataSection = document.createElement("section");
  mediaDataSection.setAttribute("class", "mediaDataSection");
  mediaDataSection.setAttribute("aria-label", "media info");

  // implementing name in mediaElementDataSection
  const titleParagraph = document.createElement("p");
  titleParagraph.textContent = mediaElement.title;
  mediaDataSection.appendChild(titleParagraph);
  // implementing likes
  const likeParagraph = document.createElement("p");
  const FullHeart = document.createElement("em");
  FullHeart.style.display = "none";
  const EmptyHeart = document.createElement("em");
  const likeBox = document.createElement("checkbox");
  likeBox.setAttribute("class", "likeBox");
//   likeBox.setAtrtribute("tabindex", "1");

  FullHeart.setAttribute("class", "fa-heart fa-solid");
  EmptyHeart.setAttribute("class", "fa-heart fa-regular ");

  const mediaLikesClone = mediaElement.likes;
  likeParagraph.textContent = mediaElement.likes;
  likeBox.appendChild(likeParagraph);
  likeBox.appendChild(FullHeart);
  likeBox.appendChild(EmptyHeart);

  mediaDataSection.appendChild(likeBox);

  // preparing eventListener
  likeBox.addEventListener("click", () => {
    if (mediaElement.likes == mediaLikesClone) {
      mediaElement.likes++;
      FullHeart.style.display = "flex";
      EmptyHeart.style.display = "none";

      likeParagraph.textContent = mediaElement.likes;
    } else {
      mediaElement.likes--;
      likeParagraph.textContent = mediaElement.likes;
      FullHeart.style.display = "none";
      EmptyHeart.style.display = "flex";
    }
  });

  // implementing media images and videos
  const visualSection = document.createElement("section");
  visualSection.setAttribute("class", "visualSection");

  if (mediaElement.image) {
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `assets/media/${photographer[0].name.substr(
        0,
        photographer[0].name.indexOf(" "),
      )}/${mediaElement.image}`,
    );
    img.setAttribute("alt", `image ${mediaElement.title}`);
    img.setAttribute("role", "img");
    img.setAttribute("class", "mediaImg");
    img.setAttribute("tabindex", `1`);
    visualSection.appendChild(img);
    mediaArticle.appendChild(visualSection);
  } else {
    const video = document.createElement("video");
    video.setAttribute(
      "src",
      `assets/media/${photographer[0].name.substr(
        0,
        photographer[0].name.indexOf(" "),
      )}/${mediaElement.video}`,
    );
    video.setAttribute("alt", `video ${mediaElement.title}`);
    video.setAttribute("class", "mediaVideo");
    video.setAttribute(`controls`, ``);
    video.setAttribute("tabindex", "1");
   
    visualSection.appendChild(video);
    mediaArticle.appendChild(visualSection);
  }
  visualSection.addEventListener("click", () => {
    getCaroussel(photographer[0], media, mediaElement);
  });
  visualSection.addEventListener("keydown", (e) => { if(e.key=='Enter'){
    getCaroussel(photographer[0], media, mediaElement);}
  });
  // adding mediaDataSection to article
  mediaArticle.appendChild(mediaDataSection);
  return mediaArticle;
}
