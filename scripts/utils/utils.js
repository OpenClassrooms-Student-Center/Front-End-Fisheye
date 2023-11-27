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
      case "popularite":
        medias.sort((a, b) => b.likes - a.likes);
        break;
      case "date":
        medias.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "titre":
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

  /**
   * Displays a modal with the given modal ID.
   *
   * @param {string} modalId - The ID of the modal to be displayed.
   * @return {void} 
   */
  function displayModal(modalId) {
    const modal = document.querySelector(`#${modalId}`);
    const header = document.querySelector("header");
    const main = document.querySelector("main");
  
    modal.showModal();
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
  }
  
  /**
   * Closes the modal with the specified ID.
   *
   * @param {string} modalId - The ID of the modal to be closed.
   * @return {undefined} This function does not return a value.
   */
  function closeModal(modalId) {
    const modal = document.querySelector(`#${modalId}`);
    const header = document.querySelector("header");
    const main = document.querySelector("main");
  
    modal.close();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    header.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");
  }
  
 export { changeFilter, getFirstName, displayModal, closeModal };