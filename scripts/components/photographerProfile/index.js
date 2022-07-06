export class PhotographerProfilHeader {
  /**
   * Constructor
   * @param {Object} photographer
   */
  constructor(photographer) {
    this.name = photographer?.name || "Joe is dead :)";
    this.alt = photographer?.alt;
    this.city = photographer?.city;
    this.country = photographer?.country;
    this.tagline = photographer?.tagline;
    this.portrait = photographer?.portrait;
  }

  /**
   * build  photographer header
   * @returns {HTMLElement}
   */
  createUserProfil() {
    const photographeCardHeader = `
        <div>
            <h1>${this.name}</h1>
            <p>${this.city}, ${this.country}</p>
            <p>${this.tagline}</p>
        </div>
        <div>
            <button class="contact-button open-form">Contactez-moi</button>
        </div>
        <div>
            <img src="assets/photographers/${this.portrait}" alt="photo de profil, ${this.alt}">
        </div>`;

    return photographeCardHeader;
  }
}
