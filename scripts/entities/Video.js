class Video {
  constructor(jsonVideo, photographerName) {
    jsonVideo && Object.assign(this, jsonVideo);
    this.photographerName = photographerName;
  }

  getDOM() {
    return `<div tabindex="0" class="media-preview">
          <video tabindex="-1">
            <source src="/assets/Sample Photos/${this.photographerName}/${this.video}">
          </video>
          <div>
          <p class="media-title">${this.title}</p>
          <div class="like-section" aria-label="J'aime ce contenu" tabindex="0">
            <p class="like-count">
            ${this.likes}
            </p>
            <i class="fa fa-heart" aria-hidden="true"></i>
          </div>
        </div>
        </div>`;
  }
}
