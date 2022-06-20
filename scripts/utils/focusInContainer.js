//Garder le focus uniquement dans les formulaires, lightbox, select, ect..
function setFocusOnlyInContainer(
  classContainer,
  classFirstElement,
  classLastElement,
  closeContainer = null
) {
  document
    .querySelector(classContainer)
    .addEventListener("keydown", (event) => {
      //Si element change de place dans le container
      let firstElement = document.querySelector(classFirstElement);
      let lastElement = document.querySelector(classLastElement);

      let isTab = event.key == "Tab" || event.keyCode == 9;
      let isEscape = event.key == "Escape" || event.keyCode == 27;

      if (!isTab || isEscape) {
        if (closeContainer && isEscape) closeContainer();
        return;
      }
      if (event.shiftKey) {
        if (document.activeElement == firstElement) {
          firstElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement == lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    });
}
