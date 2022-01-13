async function getPhotographers() {
  try {
    const data = await fetch("../../data/photographers.json");
    const jsonData = await data.json();
    const photographers = jsonData.photographers;
    return {
      photographers: [...photographers],
    };
  } catch (err) {
    const errMessage = document.createElement("p");
    errMessage.innerText = err;
    document.getElementById("main").appendChild(errMessage);
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getPhotographerPreview();
    photographersSection.innerHTML += userCardDOM;
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
