class Factory {
  static getLightboxMedia(media, name) {
    if (media.video) {
      const vids = `assets/Sample Photos/${name}/${media.video}`;
      console.log(vids);
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

    if (media.image) {
      const pictures = `assets/Sample Photos/${name}/${media.image}`;

      let newImage = document.createElement("img");
      newImage.setAttribute("src", pictures);
      newImage.setAttribute("class", "picturesSize");
      newImage.style = "cursor:pointer";
      /*newImage.addEventListener("click", () => {
        lightbox.displayLightbox(enregMedia.id);
      });*/

      //crée le titre
      let pictureTitle = document.createTextNode(media.title);

      //crée l'élement pictureLegend titre + likes + <3 de la photo
      let legendContainer = document.createElement("div");

      //crée élément nombre de likes de la photo / CSS
      const likesMedia = document.createElement("p");
      likesMedia.setAttribute("class", "picturesText");
      likesMedia.textContent = media.likes;

      //crée élément coeur de la photo / CSS à faire
      const heart = document.createElement("p");
      heart.innerHTML = '<i class="fas fa-heart"></i>';
      heart.setAttribute("class", "picturesText");

      //le loveContainer - au clic, met à jour le like et le total like de la stickybar
      const loveContainer = document.createElement("div");
      loveContainer.setAttribute("class", "likesHeart");
      loveContainer.append(likesMedia, heart);
      /*loveContainer.addEventListener("click", () => {
        likesMedia.textContent = enregMedia.likes += 1;
        // cursor main au survol? CSS hover
        this.stickyBar(this.photographer, this.medias);
      });*/

      //crée element container de tout
      legendContainer.setAttribute("class", "underpicture");
      legendContainer.append(pictureTitle, loveContainer);

      container.setAttribute("class", "cardSize");
      container.append(legendContainer, newImage);
    } else if (media.video) {
      console.log(media.video);
      const vids = `assets/Sample Photos/${name}/${media.video}`;
      let newVideo = document.createElement("video");
      newVideo.setAttribute("src", vids);
      newVideo.controls = true;
      newVideo.setAttribute("class", "controls");

      let videoLegend = document.createElement("a");
      //videoLegend.addEventListener("click", () => {
      //lightbox.displayLightbox(enregMedia.id);
      //});
      // créer élément title et likes pour la video??
      videoLegend.appendChild(newVideo);
      container.append(videoLegend, newVideo);
      //mediasSection.appendChild(videoLegend);
    }
    return container;
  }
}
