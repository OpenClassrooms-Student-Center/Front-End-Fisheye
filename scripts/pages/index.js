async function getPhotographers() {
  try {
      const response = await fetch('data/photographers.json');
      if (!response.ok) {
          throw new Error('Impossible de récupérer les données des photographes.');
      }
      const data = await response.json();
      console.log(data.photographers);
      return data.photographers;
  } catch (error) {
      console.error(error);
      return [];
  }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = homepageTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
  try {
    const photographers = await getPhotographers();
    displayData(photographers);
  } catch (error) {
      console.error(error);
  }
}

init();
