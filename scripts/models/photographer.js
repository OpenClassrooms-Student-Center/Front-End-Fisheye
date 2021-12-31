class Photographer {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
  }

  getPortrait() {
    return `./assets/photographers/${this.portrait}`;
  }

  get userCardDOM() {
    const $wrapper = document.createElement("article");
    const photographCard = `
      <a href="./photographer.html?photographerId=${this.id}">
        <img class="user" src="${this.getPortrait()}" alt="${this.name}"/>
        <h2>${this.name}</h2>
      </a>
      <h4>${this.city}</h4>
      <p class="tagline">${this.tagline}</p>
      <p class="price">${this.price}€/jour</p>
      `;
    $wrapper.innerHTML = photographCard;

    return $wrapper;
  }

  get photographHeaderDOM() {
    // Retourne le header du photographe
    const $wrapper = document.querySelector(".photograph-header");
    const headerDOM = `
    <div class="photograph-header__desc">
      <h1>${this.name}</h1>
      <h4>${this.city}</h4>
      <p>${this.tagline}</p>
    </div>
    <button class="contact_button" onclick="displayModal()">
      Contactez-moi
    </button>
    <img class="user" src="${this.getPortrait()}" alt="${this.name}" />`;
    $wrapper.innerHTML = headerDOM;
  }
}
