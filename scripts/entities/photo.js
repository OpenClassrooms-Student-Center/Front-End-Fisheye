class Photo {
  constructor(jsonPhoto, photographerName) {
    jsonPhoto && Object.assign(this, jsonPhoto);
    this.photographerName = photographerName;
  }

  getDOM() {
    return `<a href="?id=${this.id}">
        <img
          src="/assets/Sample Photos/${this.photographerName}/${this.image}"
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
