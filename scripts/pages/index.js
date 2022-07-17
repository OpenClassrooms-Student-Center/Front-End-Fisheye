async function getPhotographers() {
  // waiting the response from the url and keeping it in response variable
  let response = await fetch('data/photographers.json')
  if (response.ok) {
    // waiting for json to be converted into object and keeping it in data variable
    let data = await response.json()
    // return json data specific array
    return { photographers: data.photographers };
  } else {
    console.error('Retour du serveur : ', response.status)
  }
}
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
};

init();
