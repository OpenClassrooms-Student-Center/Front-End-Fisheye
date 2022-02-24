// DOM elements
const closeBtn = document.querySelector(".lightbox__close");
const nextBtn = document.querySelector(".lightbox__next");
const prevBtn = document.querySelector(".lightbox__prev");
console.log(closeBtn);
//fermer la ligthbox

closeBtn.addEventListener("click", closeLightbox);

 function closeLightbox() {
    console.log("c'est la");
  lightbox.classList.remove("active");

}

//ouvrir la lightbox
function openLightbox() {
  lightbox.style.display = "flex";
}

// aller a la photo suivante
function nextOne() {}
//les export
export { closeLightbox };
