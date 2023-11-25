/* eslint-disable no-unused-vars */
// Tri par popularité (likes)
function sortByPopularity(mediaList) {
  return mediaList.slice().sort((a, b) => b.likes - a.likes);
}

// Tri par date
function sortByDate(mediaList) {
  return mediaList.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Tri par titre
function sortByTitle(mediaList) {
  return mediaList.slice().sort((a, b) => a.title.localeCompare(b.title));
}
