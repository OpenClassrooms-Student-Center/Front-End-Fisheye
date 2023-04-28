  
async function getPhotographers() {
    const response = await fetch('data/photographers.json');
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.error('Erreur chargement des photographes');
    }
  };
  

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
// affiche les photos des photographes
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








    


    
