async function getPhotographers() {
  const photographers = await fetch("/data/photographers.json")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
//   console.log("photographers:", photographers);
}

async function displayData(photographers) {
  const $photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    $photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
