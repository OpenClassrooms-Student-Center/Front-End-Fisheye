import View from './View';

/**
 * A PageComponentView represents a visual representation of a semantic view in the application (Header, Main, Footer)
 */
class PageComponentView extends View {
  /**
   * Handles the load event to render
   * @param {function} handler handler function that will be invoked when the load event listener will be triggered
   * @return {undefined} No returned value by the function
   * @author Werner Schmid
   */
  addHandlerLoadPage(handler) {
    window.addEventListener('load', event => {
      event.preventDefault();
      handler();
    });
  }
}

/**
 * The module export the PageComponentView class
 */
export default PageComponentView;
