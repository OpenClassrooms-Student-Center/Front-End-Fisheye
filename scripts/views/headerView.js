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
    // Set the data-main-page parameter on the header component
    this._parentElement.dataset.MainPage = this._data === '/' ? true : false;
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
    <a class="header__index-link" href="/" aria-label="Fisheye Home page">
      <img role="img" aria-hidden="true" src="assets/images/logo.png" class="header__logo" alt="Fisheye Home page" />
    </a>
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

  /**
   * Function called when the user reloads the page
   * @returns {undefined} No returned value by the function
   * @author Werner Schmid
   */
  reload(data) {
    this._data = data;
    // Set the data-main-page parameter on the header component
    this._parentElement.dataset.MainPage = this._data === '/' ? true : false;
    const headerTitle = this._parentElement.querySelector('.header__title');

    if (headerTitle) {
      if (this._data !== '/') this._parentElement.removeChild(headerTitle);
      return;
    }
    if (this._data === '/')
      this._parentElement.insertAdjacentHTML(
        'beforeend',
        this._generateHeaderTitleMarkup()
      );
  }
}

/**
 * The single existing instance of the HeaderView in the application is instantiated
 */
const headerView = new HeaderView("Erreur de chargement de l'en-tête");

/**
 * The module exports the single instance of the HeaderView
 */
export default headerView;
