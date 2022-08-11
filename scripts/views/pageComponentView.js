import View from './View';

/**
 * A PageComponentView represents a visual representation of a semantic view in the application (Header, Main, Footer)
 */
export default class PageComponentView extends View {
  /**
   * Handles the load event to render
   * @param {function} handler handler function that will be invoked when the load event listener will be triggered
   */
  addHandlerLoadPage(handler) {
    window.addEventListener('load', event => {
      event.preventDefault();
      handler();
    });
  }
}
