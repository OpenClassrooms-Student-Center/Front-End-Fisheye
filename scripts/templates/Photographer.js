class PhotographerTemplate {
    constructor(data) {
      this._data = data;
    }
  
    UserCardDOM() {
        return `
            <article class="photographer" data-id="${this._data.id}" data-name="${this._data.name}">
                <a href="photographer.html?id=${this._data.id}">
                    <div>
                        <img class="portrait" src="${this._data.portrait}" alt="${this._data.name}" aria-hidden="true">
                        <h2 class="name">${this._data.name}</h2>
                    </div>
                </a>
                <h3 class="location">${this._data.location}</h3>
                <p class="tagline">${this._data.tagline}</p>
                <p class="price">${this._data.price}€/jour</p>
            </article>
        `;
    }
  
    UserTitleDOM() { return `Fisheye - ${this._data.name}`; }
  
    UserBannerDOM() {
        return `
            <div class="info">
                <h1 class="name">${this._data.name}</h1>
                <p class="location">${this._data.location}</p>
                <p class="tagline">${this._data.tagline}</p>
            </div>
            <button class="btn btn-contact open" type="button" aria-label="Contact Me">Contactez-moi</button>
            <img class="portrait" src=${this._data.portrait} alt="${this.name}">
        `;
    }
  
    UserInsertDOM() {
        return `
            <div class="insert">
                <span class="insert-likes"></span>
                <span class="insert-price">${this._data.price}€ / jour</span>
            </div>
        `;
    }
}