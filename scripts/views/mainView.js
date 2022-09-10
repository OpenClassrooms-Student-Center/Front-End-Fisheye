import PageComponentView from './pageComponentView';

/**
 * A MainView represents a visual representation of the main semantic tag in the page
 */
class MainView extends PageComponentView {
  /**
   * constructor of the MainView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new MainView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector('.main'), errorMessage);
  }

  /**
   * @override
   */
  _generateMarkup() {
    return `
    ${
      this._data === '/'
        ? `
    <section class="main__photographer-list" role="list">
    </section>
    `
        : `
    <header class="main__photographer-infos"></header>
    <section class="main__photographer-medias"></section>
    <footer class="main__photographer-footer"></footer>
    `
    }
      `;
  }
}

/**
 * The single existing instance of the MainView in the application is instantiated
 */
const mainView = new MainView('Erreur de chargement du contenu');

/**
 * The module exports the single instance of the MainView
 */
export default mainView;
