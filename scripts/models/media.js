class MediaModel {
  constructor(mediaData) {
    console.log(mediaData)
    this.mediaData = new MediaFactory(mediaData);
    this.likes = mediaData.likes;
    this.image = mediaData.image;
    this.title = mediaData.title;
    this.video = mediaData.video;
    this.name = mediaData.name;

    //Get first name to access medias folder
    const photographerName = this.name.split(" ");
    const pathName = photographerName[0].replace("-"," ");
    // const media = this.image ? this.image : this.video
    const media = new MediaFactory(mediaData)
    this.mediaPath = `assets/photographers/${pathName}/${media}`;
  }

  getMediaCardDOM() {
    //DOM elements of media card
    const figure = document.createElement("figure");
    const figcaption = document.createElement("figcaption");
    const p = document.createElement("p");
    const media = document.createElement(this.image ? "img" : "video");
    const divLikes = document.createElement("div");
    const likesNb = document.createElement("span");
    const btnLike = document.createElement("button");
    const heart = document.createElement("i");

    //Set attributes and class for the CSS
    media.setAttribute("src", this.mediaPath);
    media.setAttribute("alt", this.title);
    media.setAttribute("tabindex", "0");
    divLikes.classList.add("likes");
    heart.classList.add("fa-regular", "fa-heart");
    heart.setAttribute("aria-label", "likes");

    //Text injected in HTML elements
    p.textContent = `${this.title}`;
    likesNb.textContent = `${this.likes}`;

    //Add created elements in the DOM
    figure.append(media, figcaption);
    figcaption.append(p, divLikes);
    btnLike.append(heart);
    divLikes.append(likesNb, btnLike);

    return {figure};
  }

  static createMediaCard(currentMedias, currentPhotographer) {
    this.mediasSection = document.querySelector("#medias_section");
    this.currentPhotographer = currentPhotographer;

    //Create section for each media in DOM
    currentMedias.forEach((media) => {
      const photographerMedia = new MediaFactory(media, currentPhotographer);
      const mediaCardDOM = photographerMedia.getMediaCardDOM();
      this.mediasSection.appendChild(mediaCardDOM.figure);
    });
  }

  static createSortList() {}
}

class ImageInfo {

}

class VideoInfo {

}
