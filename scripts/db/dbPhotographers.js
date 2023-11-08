/**
 * Ce fichier permet de faire le lien avec la base de donnée des photographes
 */
function dbPhotographers() {
  /**
   * Fonction qui récupère tous les photographes de la base de données JSON
   * @returns {Promise<array>}
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
   * @returns {Promise<object>}
   */
  const getPhotographerById = async (idP) => {
    let photographer;
    try {
      const photographersData = await getPhotographers();
      // transform to table
      let photographersDataTab = Object.entries(
        photographersData.photographers
      );
      for (let i = 0; i < photographersDataTab.length; i++) {
        const dataId = photographersDataTab[i][1].id;
        if (dataId == idP) {
          photographer = photographersData.photographers[i];
        }
      }
    } catch (error) {
      console.log(error.message);
    }
    return photographer;
  };

  return { getPhotographers, getPhotographerById };
}

export { dbPhotographers };
