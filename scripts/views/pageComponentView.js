import View from './View';

/**
 * A PageComponentView represents a visual representation of a semantic view in the application (Header, Main, Footer)
 */
class PageComponentView extends View {
  /**
   * Handles the load event to render
   * @param {function} handler handler function that will be invoked when the load event listener will be triggered
   * @return {Promise} A Promise that will resolve once the whole page is rendered and the given handler executed
   * @author Werner Schmid
   */
  addHandlerLoadPage(handler) {
    return new Promise((resolve, _) => {
      window.addEventListener('load', event => {
        handler();
        resolve();
      });
    });
  }
}

/**
 * The module export the PageComponentView class
 */
export default PageComponentView;
