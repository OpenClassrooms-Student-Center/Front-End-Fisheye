async function getPhotographers() {   
    let url = '../data/photographers.json';
    try {
        let res = await fetch(url)
        let json = await res.json();
        return json.photographers;   
    }
    catch (error){
        console.log(error);
    } 
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}
init();