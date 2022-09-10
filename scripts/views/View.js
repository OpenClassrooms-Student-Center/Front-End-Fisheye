/**
 * A View represents a visual representation of the data in the application
 */
class View {
  /**
   * constructor of the View class
   * @param {HTMLElement} parentElement Root HTML element of the view in the document
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @this {Object} The new View instance that will be created using the constructor
   * @returns {Object} The new View instance
   * @author Werner Schmid
   */
  constructor(parentElement, errorMessage, clearContent = true) {
    this._parentElement = parentElement;
    this._errorMessage = errorMessage;
    this._clearContent = clearContent;
  }

  /**
   * Render the received object to the DOM using the View instance
   * @param {Object | Object[]} data The data to be rendered in the View (e.g. list of photographers, photographer, list of pictures)
   * @returns {undefined} No returned value by the function
   * @this {Object} The current View instance calling the render function
   * @author Werner Schmid
   */
  render(data, begin = true) {
    // Check the passed data and render an error message if the data isn't set
    if (!this._checkData(data)) return;

    // _generateMarkup() : template method used to generate the markup that will be displayed in the View : the method has to be overriden by the child classes
    const markup = this._generateMarkup();
    // Clear the content of the View
    this._clear();
    // Render the new markup in the parentElement in the View
    this._parentElement.insertAdjacentHTML(
      begin ? 'afterbegin' : 'beforeend',
      markup
    );

    // _postRender() : template method used to do some works after the View has been rendered
    this._postRender();
  }

  /**
   * Check the passed data and renders an error if the data isn't valid
   * @param {Object | Object[]} data The data to be rendered in the View
   * @returns {boolean} true if the data is valid, false otherwise
   * @author Werner Schmid
   */
  _checkData(data) {
    // Render error message if there isn't any data to display
    if (!data || (Array.isArray(data) && data.length === 0)) {
      this.renderError();
      return false;
    }
    // Set the data of the View to be equal to the data passed as a parameter
    this._data = data;
    return true;
  }

  /**
   * Render a error message
   * @param {string} message Error message to be rendered in the error markup (by default : the default error message of the View)
   * @returns {undefined} No returned value by the function
   * @this {Object} the current View instance calling the renderError function
   * @author Werner Schmid
   */
  renderError(message = this._errorMessage) {
    // Generate the error message markup
    const markup = `
    <div class="error">
        <div>
            <svg>
                <use href="img/icons.svg#icon-alert-triangle"></use>
            </svg>
        </div>
        <p>${message}</p>
    </div>
      `;
    // Clear the content of the View
    this._clear();
    // Render the error message in the View
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Render the loading spinner when waiting for a data to be rendered in the View
   * @returns {undefined} No returned value by the function
   * @this {Object} the current View instance calling the renderSpinner function
   * @author Werner Schmid
   */
  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="img/icons.svg#icon-loader"></use>
          </svg>
        </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Template method used to generate the content HTML Markup of the View (overriden by the child classes)
   * @returns {string} The generated HTML Markup of the View
   * @author Werner Schmid
   */
  _generateMarkup() {
    return '';
  }

  /**
   * Template method used to do something after the markup has been rendered
   * @returns {undefined} No returned value by the function
   * @author Werner Schmid
   */
  _postRender() {}

  /**
   * Returns the parent element of the view
   * @returns {HTMLElement} Parent element of the View
   * @author Werner Schmid
   */
  getParentElement() {
    return this._parentElement;
  }

  /**
   * Used to set a new parent element for the View. This function is useful when the parent of the View doesn't exist in the DOM at its creation
   * @param {HTMLElement} newParent New parent element in the DOM for the View
   * @author Werner Schmid
   */
  setParentElement(newParent) {
    this._parentElement = newParent;
  }

  /**
   * Clear the content of the View instance if the clearContent variable is set to true
   * @returns {undefined} No returned value by the function
   * @this {Object} The current View instance calling the clear function
   * @author Werner Schmid
   */
  _clear() {
    if (this._clearContent) this._parentElement.innerHTML = '';
  }
}

/**
 * The module export the View class
 */
export default View;
