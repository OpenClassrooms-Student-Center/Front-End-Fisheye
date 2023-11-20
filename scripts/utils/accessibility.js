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
          /* shift + tab */
          if (document.activeElement === firstFocusElement) {
            lastFocusElement.focus();
            e.preventDefault();
          }
        } /* tab */ else {
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
