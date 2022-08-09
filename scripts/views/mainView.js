import PageComponentView from "./pageComponentView";

class MainView extends PageComponentView {
  /**
   * constructor of the MainView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new MainView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector(".main"), errorMessage);
  }

  /**
   * @override
   */
  _generateMarkup() {
    return `
    ${
      this._data === "/"
        ? `
    <section class="main__photographer-list">
    </section>
    `
        : `
    <section class="main__photographer-infos"></section>
    <section class="main__photographer-photos"></section>
    `
    }
      `;
  }
}

export default new MainView("Erreur de chargement du contenu");
