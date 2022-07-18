export class PhotographerCard {
  /**
   * Constructor
   * @param {Object} photographer
   */
  constructor(photographer) {
    this.name = photographer?.name ;
    this.alt = photographer?.alt;
    this.id = photographer?.id;
    this.city = photographer?.city;
    this.country = photographer?.country;
    this.tagline = photographer?.tagline;
    this.price = photographer?.price;
    this.portrait = photographer?.portrait;
  }

  /**
   * Build the Card
   * @returns {HtmlElement} article element containing infos Photographer
   */
  createPhotographerCard() {
    const article = document.createElement("article");
    const contentCard = `
            <a href="photographer.html?photographer=${this.id}">
                <img src="assets/photographers/${this.portrait}" alt="photo de profile, ${this.alt}">
                <h2>${this.name}</h2>
            </a>
            <p>${this.city}, ${this.country}</p>
            <p>${this.tagline}</p>
            <p>${this.price}€/jour</p>`;

    article.innerHTML = contentCard;

    return article;
  }
}
