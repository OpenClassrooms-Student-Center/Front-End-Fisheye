/**
 * Sorts the given array of medias based on the specified sorting criteria.
 *
 * @param {Array} medias - The array of medias to be sorted.
 * @param {string} [sort="popularite"] - The sorting criteria. Defaults to "popularite".
 *    Possible values: "popularite", "Date", "Titre".
 * @return {Array} The sorted array of medias.
 */
function changeFilter(medias, sort = "popularite") {

    switch (sort) {
      case "Popularite":
        medias.sort((a, b) => b.likes - a.likes);
        break;
      case "Date":
        medias.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "Titre":
        medias.sort((a, b) => (a.title > b.title ? 1 : -1));
        break;
    }
    return medias;
  }

  /**
   * Retrieves the first name of the photographer.
   *
   * @param {string} photographerFirstName - The full name of the photographer.
   * @return {string} The first name of the photographer.
   */
  function getFirstName(photographerFirstName) {
    const firstName = photographerFirstName.split(" ")[0].replace("-", " ");
    return firstName;
  }

  export {changeFilter, getFirstName}