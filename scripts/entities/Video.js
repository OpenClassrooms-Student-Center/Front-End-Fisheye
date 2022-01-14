class Video {
  constructor(jsonVideo, photographerName) {
    jsonVideo && Object.assign(this, jsonVideo);
    this.photographerName = photographerName;
  }

  getDOM() {
    return `<div class="media-preview">
          <video>
            <source src="/assets/Sample Photos/${this.photographerName}/${this.video}">
          </video>
          <div>
            <p class="media-title">${this.title}</p>
            <p class="like-count">
              ${this.likes} <i class="fa fa-heart" aria-hidden="true"></i>
            </p>
          </div>
        </div>`;
  }
}
