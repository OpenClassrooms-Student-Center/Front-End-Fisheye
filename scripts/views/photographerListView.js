import View from "./View";
import { photographerFactory } from "../factories/photographer";

class PhotographerListView extends View {
  /**
   * constructor of the PhotographerListView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new PhotographerListView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector(".main__photographer-list"), errorMessage);
  }

  /**
   * @override
   */
  _generateMarkup() {
    return this._data
      .map((result) => photographerFactory(result).getUserCardDOM())
      .join("\n");
  }

  _generateMarkupPhotograph(photographData) {
    return `
    <article class="card">
        <a href="#" class="card__link" data-id="${photographData.id}">
            <img src="assets/photographers/account.png" class="card__portrait" />
            <h2 class="card__name">${photographData.name}</h2>
        </a>
        <div class="card__description">
            <p class="card__location">
              <span class="card__city">${photographData.city}</span>,
              <span class="card__country">${photographData.country}</span>
            </p>
            <p class="card__tagline">${photographData.tagline}</p>
            <p class="card__price">
              <span class="card__price-value">${photographData.price}</span>
              <span class="card__price-currency">€</span>/jour
            </p>
        </div>
    </article>
    `;
  }
}

export default new PhotographerListView(
  "Erreur de chargement de la liste des photographes"
);
