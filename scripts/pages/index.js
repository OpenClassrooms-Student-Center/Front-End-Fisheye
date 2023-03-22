async function getPhotographers() {
   // Fetch JSON
   return fetch("./data/photographers.json")
      .then(function (res) {
         if (res.ok) {
            return res.json();
         }
      })
      .then(function (data) {
         return data;
      })
      .catch(function (err) {
         alert("An errors occurs : " + err);
      });
}

async function displayData(photographers) {
   // Display photographers
   const photographersSection = document.querySelector("#photographer_section");

   photographers.forEach((photographer) => {
      const photographerModel = new PhotographerFactory(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM.article);
   });
}

async function init() {
   // Récupère les datas des photographes
   const { photographers } = await getPhotographers();
   displayData(photographers);
};

init();
