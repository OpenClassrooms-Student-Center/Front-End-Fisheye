// Fonction utilitaire pour créer une balise <img>
function createImage(src, alt) {
  const $image = document.createElement("img");
  $image.setAttribute("src", src);
  $image.setAttribute("alt", alt);
  return $image;
}

// Fonction utilitaire pour créer une balise <video>
function createVideo(src) {
  const $video = document.createElement("video");
  const $source = document.createElement("source");
  $source.setAttribute("src", src);
  $source.setAttribute("type", "video/mp4");
  $video.appendChild($source);
  return $video;
}

// Fonction utilitaire pour créer une balise <figure>
function createFigure($content) {
  const $figure = document.createElement("figure");
  $figure.classList.add("media-card");
  $figure.appendChild($content);
  return $figure;
}

// Fonction utilitaire pour créer une balise <figcaption>
function createCaption(text) {
  const $figcaption = document.createElement("figcaption");
  $figcaption.textContent = text;
  return $figcaption;
}
