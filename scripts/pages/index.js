async function getPhotographers() {
  let photographers = []

  fetch("../../data/photographers.json")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      console.log(value);
      for (let i = 0; i < value.length; i++) {
        photographers.push(value[i]);
      }
    })
    .catch(function (err) {
      console.log(err);
    });

  return photographers;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
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
