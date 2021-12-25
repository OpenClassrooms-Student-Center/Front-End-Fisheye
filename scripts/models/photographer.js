class Photographer {
  constructor(data) {
    this._name = data.name;
    this._id = data.id;
    this._city = data.city;
    this._country = data.country;
    this._tagline = data.tagline;
    this._price = data.price;
    this._portrait = data.portrait;
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  get city() {
    return this._city;
  }

  get country() {
    return this._country;
  }

  get tagline() {
    return this._tagline;
  }

  get price() {
    return this._price;
  }

  get portrait() {
    return `./assets/photographers/${this._portrait}`;
  }

  get userCardDOM() {
    const $wrapper = document.createElement("article");
    const photographCard = `
      <a href="./photographer.html?photographer-id=${this._id}">
        <img class="user" src="${this.portrait}" alt="${this._name}"/>
        <h2>${this._name}</h2>
      </a>
      <h4>${this._city}</h4>
      <p class="tagline">${this._tagline}</p>
      <p class="price">${this._price}€/jour</p>
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
    <img class="user" src="${this.portrait}" alt="${this.name}" />`;
    $wrapper.innerHTML = headerDOM;
  }
}
