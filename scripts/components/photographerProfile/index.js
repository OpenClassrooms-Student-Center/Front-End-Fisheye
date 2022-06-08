export class PhotographerProfil {
  constructor(photographer) {
    this.name = photographer.name;
    this.alt = photographer.alt;
    this.city = photographer.city;
    this.country = photographer.country;
    this.tagline = photographer.tagline;
    this.portrait = photographer.portrait;
  }
  createUserProfil() {
    const photographeCard = `
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

    return photographeCard;
  }
}
