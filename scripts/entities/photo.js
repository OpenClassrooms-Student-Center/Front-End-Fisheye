class Photo {
  constructor(jsonPhoto) {
    jsonPhoto && Object.assign(this, jsonPhoto);
  }

  getMediaUrl() {
    return `?id=${this.id}`;
  }

  getPhotoThumbnailDOM(photographer) {
    return `<a href="${this.getMediaUrl()}">
        <img
          src="/assets/Sample Photos/${photographer}/${this.image}"
          alt="${this.altText}"
        />
        <div>
          <p class="photograph-name">${this.title}</p>
          <p class="like-count">
            ${this.likes} <i class="fa fa-heart" aria-hidden="true"></i>
          </p>
        </div>
      </a>`;
  }
}
