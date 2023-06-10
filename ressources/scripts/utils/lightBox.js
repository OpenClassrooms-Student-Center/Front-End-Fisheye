const body = document.querySelector("body");
const main = document.querySelector("main");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const lightboxModal = document.querySelector(".lightboxModal");
const mainButtons = main.querySelectorAll("button");
const a = document.querySelector("a");

// on affiche la lightbox avec display flex en passant également l'aria-hidden à false. Tout le reste de la page est en aria-hidden true afin qu'il ne soit pas pris en compte par les lecteurs d'écran. De même on passe tous les élements extérieurs à la modale en tabindex = -1 afin de ne pas pouvoir naviguer dessus à l'aide du clavier lorsque la modale est ouverte
function renderLightboxModal() {
  main.setAttribute("aria-hidden", "true");
  header.setAttribute("aria-hidden", "true");
  footer.setAttribute("aria-hidden", "true");
  a.setAttribute("aria-hidden", "true");
  a.setAttribute("tabindex", "-1");

  const mediaButtons = document.querySelectorAll(".media__btn");
  mediaButtons.forEach(function(button) {
    button.setAttribute("tabindex", "-1");
  });
  const formButton = document.querySelector(".contact__button");
  formButton.setAttribute("tabindex", "-1")
  mainButtons.forEach(function(button) {
    button.setAttribute("tabindex", "-1");
  });

  lightboxModal.setAttribute("aria-hidden", "false");
  body.classList.add("no-scroll");
  lightboxModal.style.display = "flex";
}

// fonction inverse à la précédente, on repasse toute la page en aria-hidden false, avec tabindex = 0
function closeLightboxModal() {
  main.setAttribute("aria-hidden", "false");
  header.setAttribute("aria-hidden", "false");
  footer.setAttribute("aria-hidden", "false");
  a.setAttribute("aria-hidden", "false");
  a.setAttribute("tabindex", "0");

  const mediaButtons = document.querySelectorAll(".media__btn");
  mediaButtons.forEach(function(button) {
    button.setAttribute("tabindex", "0");
  });
  const formButton = document.querySelector(".contact__button");
  formButton.setAttribute("tabindex", "0")
  mainButtons.forEach(function(button) {
    button.setAttribute("tabindex", "0");
  });

  lightboxModal.setAttribute("aria-hidden", "true");
  body.classList.remove("no-scroll");
  lightboxModal.style.display = "none";
}

// appel de la fonction closeLightboxModal() au click sur le bouton de fermeture, et on en profite pour vider le contenu de la lightbox
function closeLightboxOnClick() {
  const closeBtn = document.querySelector(".lightboxModal__close");
  closeBtn.addEventListener("click", function() {
    const lightboxFigure = document.querySelector(".lightboxModal__figure");
    if (lightboxFigure) {lightboxFigure.remove()}
    closeLightboxModal();
  })
}

// possibilité pour l'utilisateur d'appeler la fonction closeLightboxModal() en clickant sur Echap
function closeLightboxWithEsc() {
  document.addEventListener('keydown', event => {
      const code = event.code
      if (lightboxModal.getAttribute('aria-hidden') == 'false' && code === "Escape") {
          closeLightboxModal()
      }
  })
}

// on compare l'index du média affiché dans la lightbox avec la longueur de l'array de média triés. Si c'est le premier média, on n'affiche pas le bouton "précedent", si c'est le dernier, on n'affiche pas le bouton "suivant".
export function disableLightboxButtons(index, mediasLength) {
  const previous = document.querySelector(".lightboxModal__previous");
  const next = document.querySelector(".lightboxModal__next");
  if (index === 0) {
    previous.style.display = "none";
    next.style.display = "block";
  } else if (index === mediasLength -1) {
    next.style.display = "none";
    previous.style.display = "block";
  } else {
    next.style.display = "block";
    previous.style.display = "block";
  }
}

export function initLightbox(){
  disableLightboxButtons()
  renderLightboxModal();
  closeLightboxOnClick();
  closeLightboxWithEsc();
}
