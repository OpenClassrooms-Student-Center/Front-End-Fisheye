/*********************************************************************************
*
* This file manage accessibility
*
/*********************************************************************************/
/**
 * Function that trap focus into element
 * and make an action when escape is pressed (more often it's close action)
 * @param {HTMLElement} element
 * @param {string} attribute
 * @param {string} attributeValue
 * @param {function} action
 * @param {HTMLElement} firstFocusElement
 * @param {HTMLElement} lastFocusElement
 */
const manageAccessibilityFocus = (
  element,
  attribute,
  attributeValue,
  action,
  firstFocusElement,
  lastFocusElement
) => {
  document.addEventListener('keydown', (e) => {
    // Close element when escape key is pressed
    if (element.getAttribute(attribute) === attributeValue) {
      if (e.key === 'Escape' || e.code === 'Escape') {
        action();
      }
      // Trap focus into element
      if (e.key === 'Tab' || e.code === 'Tab') {
        if (e.shiftKey) {
          // shift + tab
          if (document.activeElement === firstFocusElement) {
            lastFocusElement.focus();
            e.preventDefault();
          }
        } else {
          // tab
          if (document.activeElement === lastFocusElement) {
            firstFocusElement.focus();
            e.preventDefault();
          }
        }
      }
    }
  });
};
export { manageAccessibilityFocus };
