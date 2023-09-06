/**
 * Fetch data from photographers.json
 * @returns An object which contains a list of photographers and a list of medias
 */
async function getPhotographers() {
  try {
      const data = await fetch('./data/photographers.json');
      console.log(`data`, data);
      const photographers = data.json();
      return photographers;
  } catch (error) {
      console.log(error);
  }
}

/**
 * Call getPhotographers then filter on id parameter
 * @param {*} id Number, photographer id
 * @returns An object which contains photographer data and a list of his medias
 */
async function getPhotographerById(id) {
  try {
      const photographersData = await getPhotographers();
      const photographer = {
        photographer: photographersData.photographers.find(usr => usr.id === id),
        media: photographersData.media.filter(media => media.photographerId === id)
      };

      return photographer;
  } catch (error) {
      console.log(error);
  }
}