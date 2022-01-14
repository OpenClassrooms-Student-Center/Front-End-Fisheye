class Photographer {
  constructor(jsonPhotographer) {
    jsonPhotographer && Object.assign(this, jsonPhotographer);
  }

  getFormattedPrice() {
    return this.price + "€ / jour";
  }

  getPortraitUrl() {
    return `assets/Sample Photos/Photographers ID Photos/${this.portrait}`;
  }

  getPageName() {
    return `Fisheye - ${this.name}`;
  }

  getPhotographerDetailsDOM() {
    return `
      <h1>${this.name}</h1>
      <p class="location">${this.city}, ${this.country}</p>
      <p class="tagline">${this.tagline}</p>
    `;
  }
}
