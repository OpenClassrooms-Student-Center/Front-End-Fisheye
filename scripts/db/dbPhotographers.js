/**
 * This file provides a link to the photographers' database.
 */
function dbPhotographers() {
  /**
   * Function that retrieves all photographers from the JSON database
   * @returns {Promise<array>}
   */
  const getPhotographers = async () => {
    let photographers;
    try {
      const reponse = await fetch('../../data/photographers.json');
      photographers = await reponse.json();
      console.log(photographers);
    } catch (error) {
      console.log(error.message);
    }
    return photographers;
  };

  /**
   * Function that retrieves a photographer from the JSON database by id
   * @param {number} idP
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
