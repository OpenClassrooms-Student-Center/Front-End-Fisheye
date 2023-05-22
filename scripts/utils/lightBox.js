const body = document.querySelector("body");
const main = document.querySelector("#main");
const lightboxModal = document.querySelector(".lightboxModal");

export function displayLightboxModal() {
  main.setAttribute("aria-hidden", "true");
  lightboxModal.setAttribute("aria-hidden", "false");
  body.classList.add("no-scroll");
  lightboxModal.style.display = "flex";

}

export function closeLightboxModal() {
  main.setAttribute("aria-hidden", "false");
  lightboxModal.setAttribute("aria-hidden", "true");
  body.classList.remove("no-scroll");
  lightboxModal.style.display = "none";
}
