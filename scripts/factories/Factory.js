class Factory {
  static getLightboxMedia(media, name) {
    if (media.video) {
      const vids = `assets/Sample Photos/${name}/${media.video}`;
      const video = document.createElement("video");
      video.src = vids;
      video.controls = true;
      video.setAttribute("class", "lightbox-img lightbox-media");
      return video;
      //
    } else if (media.image) {
      const img = document.createElement("img");
      img.setAttribute("class", "lightbox-img lightbox-media");
      const pictures = `assets/Sample Photos/${name}/${media.image}`;
      img.src = pictures;
      return img;
    }
  }
  static getMediasCards(media, name) {
    let container = document.createElement("div");
    container.setAttribute("class", "cardSize");

    //crée le titre
    const pictureTitle = (document.createElement("p").textContent =
      media.title);

    //crée élément nombre de likes de la photo et video / CSS
    const likesMedia = document.createElement("p");
    likesMedia.setAttribute("class", "picturesText");
    likesMedia.textContent = media.likes;

    //crée élément coeur de la photo et video / CSS à faire
    const heart = document.createElement("p");
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    heart.setAttribute("class", "picturesText");

    //crée l'élement pictureLegend titre + likes + <3 de la photo
    let legendContainer = document.createElement("div");

    //le loveContainer - au clic, met à jour le like et le total like de la stickybar
    const loveContainer = document.createElement("div");
    loveContainer.setAttribute("class", "likesHeart");
    loveContainer.append(likesMedia, heart);
    loveContainer.setAttribute("tabindex", "0");

    //crée element container de tout
    legendContainer.setAttribute("class", "underpicture");
    legendContainer.append(pictureTitle, loveContainer);

    if (media.image) {
      let newImage = document.createElement("img");
      const pictures = `assets/Sample Photos/${name}/${media.image}`;
      newImage.setAttribute("src", pictures);
      newImage.setAttribute("class", "picturesSize");
      newImage.setAttribute("aria-label", media.image);
      newImage.setAttribute("tabindex", "0");
      newImage.style = "cursor:pointer";

      container.append(legendContainer, newImage);
    } else if (media.video) {
      let newVideo = document.createElement("video");
      const vids = `assets/Sample Photos/${name}/${media.video}`;
      newVideo.setAttribute("src", vids);
      newVideo.setAttribute("class", "controls");
      newVideo.controls = true;
      container.append(legendContainer, newVideo);
    }
    return container;
  }
}
