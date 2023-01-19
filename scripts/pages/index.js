async function getPhotographers() {
  const data = await (await fetch("../../data/photographers.json")).json();
  console.log("data", data);
  const photographers = data.photographers;
  return { photographers: [...photographers] };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${photographer.id}`);
    link.setAttribute("title", `Profils des ${photographer.name}`);
    link.style.textDecoration = "none";
    link.appendChild(userCardDOM);
    photographersSection.appendChild(link);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
