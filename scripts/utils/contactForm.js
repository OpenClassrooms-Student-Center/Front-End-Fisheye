function getPhotographerName(photographer) {
  const $namePhotographer = document.getElementById("photographerName");
  $namePhotographer.textContent = `${photographer.name}`;

  return $namePhotographer;
}
