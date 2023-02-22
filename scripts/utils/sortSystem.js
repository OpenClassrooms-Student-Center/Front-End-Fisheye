/** Fonction pour le systeme de tri **/
function sortSystem(arrayOfMedias, valueToSortBy) {
  const sortedArray = arrayOfMedias.sort(function (a, b) {
    if (
      typeof a[valueToSortBy] === "string" &&
      typeof b[valueToSortBy] === "string"
    ) {
      return a[valueToSortBy].localeCompare(b[valueToSortBy]);
    }
    return a[valueToSortBy] - b[valueToSortBy];
  });
  if (valueToSortBy === "likes") {
    sortedArray.reverse();
  }
  return sortedArray;
}
