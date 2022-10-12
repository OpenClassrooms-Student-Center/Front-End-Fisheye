 async function getPhotographers() {
//   // la fonction asynchrone getPhotographers s'activera et affichera les infos de photographes
//   // Penser à remplacer par les données récupérées dans le json
//   const photographers = [
//     {
//       name: "Ma data test",
//       id: 1,
//       city: "Paris",
//       country: "France",
//       tagline: "Ceci est ma data test",
//       price: 400,
//       portrait: "account.png",
//     },
//     {
//       name: "Autre data test",
//       id: 2,
//       city: "Londres",
//       country: "UK",
//       tagline: "Ceci est ma data test 2",
//       price: 500,
//       portrait: "account.png",
//     },
//
//   ];
//   console.log(getPhotographers);
//   // et bien retourner le tableau photographers seulement une fois
//   return {
//     photographers: [...photographers, ...photographers, ...photographers],
//   };
  // fetch permet de faire une requete sur une url
  
  return fetch("./data/photographers.json").then(response => response.json());
}

async function displayData(photographers) {
  // la constante photographersSection selectionnne la class photographer_section
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


