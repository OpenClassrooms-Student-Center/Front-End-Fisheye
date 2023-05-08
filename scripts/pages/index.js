// Get data from json file and return the photographers array
async function getPhotographers() {
  const response = await fetch('data/photographers.json');
  const data = await response.json();
  return data.photographers;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  // Loop through the photographers array and display each photographer
  // by calling the photographerFactory function
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const photographerCard = photographerModel.getPhotographerCard();
    photographersSection.appendChild(photographerCard);
  });
}

// Display the index page
async function init() {
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
