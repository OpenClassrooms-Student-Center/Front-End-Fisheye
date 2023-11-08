/**
 * Ce fichier permet de faire le lien avec la base de donnée des photographes
 */
function dbPhotographers() {
  /**
   * Fonction qui récupère tous les photographes de la base de données JSON
   * @returns {array}
   */
  async function getPhotographers() {
    let photographers;
    try {
      const reponse = await fetch('../../data/photographers.json');
      photographers = await reponse.json();
      console.log(photographers);
    } catch (error) {
      console.log(error.message);
    }
    return photographers;
  }

  /**
   * Fonction qui récupère un photographe de la base de données JSON selon son id
   * @param {number} id
   * @returns {object}
   */
  async function getPhotographerById(id) {
    let photographer;
    try {
      // const reponse = await fetch('../../data/photographers.json');
      // photographer = await reponse.json();
      // console.log(photographer);
    } catch (error) {
      console.log(error.message);
    }
    return photographer;
  }

  return { getPhotographers, getPhotographerById };
}

export { dbPhotographers };
