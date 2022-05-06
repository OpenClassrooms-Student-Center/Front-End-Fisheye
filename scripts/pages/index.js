async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  const url = "/data/photographers.json";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.photographers);
  const photographers = data.photographers;
  // et bien retourner le tableau photographers seulement une fois
  return { photographers };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
