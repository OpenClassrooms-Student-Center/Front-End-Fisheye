import View from "./View";

class PhotographerPhotosView extends View {
  /**
   * constructor of the PhotographerPhotosView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new PhotographerPhotosView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector(".main__photographer-photos"), errorMessage);
  }

  /**
   * @override
   */
  _generateMarkup() {
    return `
    `;
  }
}

export default new PhotographerPhotosView(
  "Erreur de chargement des photos du photographe"
);
