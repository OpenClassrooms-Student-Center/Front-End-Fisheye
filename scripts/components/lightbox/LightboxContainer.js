export class LightboxContainer {
  buildDOM() {
    const lightbox = document.createElement("div");
    lightbox.classList = "lightbox";
    lightbox.setAttribute("aria-label", "vue rapprochée de l'image");
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("tabindex", "-1");
    lightbox.innerHTML = `
            <div class="lightbox-left">
                <button class="previous" aria-label="Image précédente"><i class="fas fa-angle-left"></i></button>
            </div>
            <div class="lightbox-content">
                <div>
                </div>
            </div>
            <div class="lightbox-right">
                <button class="next" aria-label="Image suivante"><i class="fas fa-angle-right"></i></button>
                <button class="close" aria-label="Fermer la lightbox"><i class="fa-solid fa-xmark"></i></button>
            </div>`;
    return lightbox;
  }
}
