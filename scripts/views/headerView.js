import { LOGO_URL } from '../utils/config';
import PageComponentView from './pageComponentView';

/**
 * A HeaderView represents a visual representation of the header in the page
 */
class HeaderView extends PageComponentView {
  /**
   * constructor of the HeaderView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new HeaderView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector('.header'), errorMessage);
  }

  /**
   * @override
   */
  _generateMarkup() {
    return `
    ${this._generateHeaderLogoMarkup()}
    ${this._data === '/' ? this._generateHeaderTitleMarkup() : ''}
    `;
  }

  /**
   * Generates the markup for the header logo
   * @returns {string} The markup element for the logo
   * @author Werner Schmid
   */
  _generateHeaderLogoMarkup() {
    return `
    <img src="${LOGO_URL}" class="header__logo" />
    `;
  }

  /**
   * Generates the markup for the header title
   * @returns {string} The markup element for the title
   * @author Werner Schmid
   */
  _generateHeaderTitleMarkup() {
    return `
    <h1 class="header__title">Nos photographes</h1>
    `;
  }
}

/**
 * The module exports an instance of the HeaderView
 */
export default new HeaderView("Erreur de chargement de l'en-tête");
