import { photographerTemplate } from "../templates/photographer.js";
async function getPhotographers() {
  try {
    const response = await fetch(
      "http://localhost:5500/data/photographers.json"
    );
    if (!response.ok) {
      throw new Error("datas can not be fetched");
    }
    const dataJson = await response.json();
    const photographers = dataJson.photographers;
    return { photographers };
  } catch (error) {
    console.error(error);
    return { photographers: [] };
  }
}

async function displayData(photographers) {
  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    //lien de redirection en fonction de l'id des photopgraphes
    userCardDOM.addEventListener("click", () => {
      window.location.href = `photographer.html?id=${photographer.id}`;
    });

    const photographersSection = document.getElementsByClassName(
      "photographer_section"
    )[0];
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
export { getPhotographers };
