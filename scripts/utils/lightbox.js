function lightbox(source) {
  //Création de la div global de la lightbox
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");
  //Création de la div de la lightbox de fermeture
  const close = document.createElement("button");
  close.classList.add("lightbox__close");
  close.addEventListener("click", () => closeLightbox());

  //Création de la div de la lightbox suivant
  const next = document.createElement("button");
  next.classList.add("lightbox__next");
  next.addEventListener("click", () => nextLightbox());
  //Création de la div de la lightbox précédent
  const prev = document.createElement("button");
  prev.classList.add("lightbox__prev");
  prev.addEventListener("click", () => prevLightbox());
  //Création de la div de la lightbox de l'image
  const container = document.createElement("div");
  container.classList.add("lightbox__container");
  const img = document.createElement("img");
  img.setAttribute("src", source);

  lightbox.appendChild(close);
  lightbox.appendChild(next);
  lightbox.appendChild(prev);
  lightbox.appendChild(container);
  container.appendChild(img);
  return lightbox;
}
function closeLightbox() {
  document.querySelector(".lightbox").remove();
}
function showLightbox(source) {
  document.getElementById("main").appendChild(lightbox(source));
  console.log(source.split("."));
}
function nextLightbox() {
  document.querySelector(".lightbox__next");

  console.log("lightbox__next");
}

function prevLightbox() {
  document.querySelector(".lightbox__prev");
  console.log("lightbox__prev");
}
