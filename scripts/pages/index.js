init();

async function init() {
   const { photographers } = await fetchData("/data/photographers.json");
  displayData(photographers);
}

async function displayData(photographers) {
  const $photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    $photographersSection.appendChild(userCardDOM);
  });
}


