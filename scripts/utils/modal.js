function displayModal(element) {
  const $modal = document.getElementById(element);
  const $overlay = document.querySelector(".overlay");
  $modal.classList.add("visible");
  $overlay.classList.add("visible");
  document.body.classList.add("modal-open");

  // Focus trap
  const focusableElements = $modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  $modal.addEventListener("keydown", trapFocus);

  function trapFocus(event) {
    if (event.key === "Tab") {
      if (event.shiftKey && document.activeElement === firstFocusable) {
        // Si la touche Tabulation + Maj est enfoncée et que le focus est sur le premier élément focusable, déplacer le focus vers le dernier.
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        // Si la touche Tabulation est enfoncée et que le focus est sur le dernier élément focusable, déplacer le focus vers le premier.
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }
}

function closeModal(element) {
  const $modal = document.getElementById(element);
  const $overlay = document.querySelector(".overlay");
  $modal.classList.remove("visible");
  $overlay.classList.remove("visible");
  document.body.classList.remove("modal-open");

  $modal.removeEventListener("keydown", trapFocus);
}
