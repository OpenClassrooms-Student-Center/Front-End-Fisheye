
// async function getPhotographers() {
//   // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
//   // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
//   fetch("./data/photographers.json")
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         throw new Error("données non collectées");
//       }
//     })
//     .then((obj) => {
//       console.log(obj.photographers[0].name);
//       console.log(obj.photographers);
//       const photographersSection = document.querySelector(".photographer_section");
//       photographersSection.name = obj.photographers[0].name;
//       return { photographers: obj.photographers };
//       // et bien retourner le tableau photographers seulement une fois récupéré
//     });

async function getPhotographers() {
    const response = await fetch("./data/photographers.json");
    if (response.ok) {
        const data = await response.json();
        console.log(data.photographers);
        return ({
            photographers: data.photographers
        })
    } else {
        throw new Error("Données des photographes inaccessibles.");
    }
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

