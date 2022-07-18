export class MediaVideo {
  /**
   * Constructor
   * @param {Object} media
   * @param {string} optionsphotographeName
   */
  constructor(media, photographeName) {
    this.photographeName = photographeName;
    this.title = media.title;
    this.alt = media.alt;
    this.likes = media.likes;
    this.video = media.video;
    this.id = media.id;
  }
  /**
   *
   * @returns {HTMLElement} article element containing  video element
   */
  buildMediaCard() {
    const videoLink = `assets/images/${this.photographeName}/${this.video}`;

    const article = document.createElement("article");
    article.classList = "mediaBox";
    article.innerHTML = `
            <video src="${videoLink}"   aria-label="${this.alt}, vue rapprochée" role="link" tabIndex="0"></video>
            <span class= "play-circle"> <i class="fa-solid fa-circle-play"></i></span>
            <div>
                <span class="titles">${this.title}</span>
                <span class="likes">${this.likes}</span>
                <span class="spanIcon" aria-label="likes" tabIndex="0" role="button">
                    <input type="checkbox" id="${this.id}" name="like" aria-label="liké">
                    <label for="${this.id}"><i class="fas fa-heart"></i></label>
                </span>
            </div>`;
    return article;
  }
}

export class MediaImg {
  /**
   * Constructor
   * @param {Object} media
   * @param {string} photographeName
   */
  constructor(media, photographeName) {
    this.photographeName = photographeName;
    this.title = media.title;
    this.alt = media.alt;
    this.likes = media.likes;
    this.image = media.image;
    this.id = media.id;
  }

  /**
   *
   * @returns {HTMLElement} article element containing  the image element
   */
  buildMediaCard() {
    const pictureLink = `assets/images/${this.photographeName}/${this.image}`;
    //console.log("this ID ==== ", this.id);

    const article = document.createElement("article");
    article.classList = "mediaBox";
    article.innerHTML = `
            <img src="${pictureLink}" alt="${this.alt}, vue rapprochée" role="link" tabIndex="0">
            <div>
                <span class="titles">${this.title}</span>
                <span class="likes">${this.likes}</span>
                <span class="spanIcon" aria-label="likes" tabIndex="0" role="button">
                    <input type="checkbox" id="${this.id}" name="like" aria-label="liké">
                    <label for="${this.id}"><i class="fas fa-heart"></i></label>
                </span>
            </div>`;
    return article;
  }
}
