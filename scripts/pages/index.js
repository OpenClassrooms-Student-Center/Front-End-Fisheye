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


//  ------------------------------------------------
// Pourquoi je ne peux pas faire d'event listener ? - Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
const sections = document.getElementsByClassName('link-wrapper');

// Ne fonctionne pas non plus...
  for (let i = 0; i < sections.length; i++) {
    sections[i].addEventListener('click', () => {
      console.log("test");
    })
  }

  // Lui non plus.
  const test = document.querySelectorAll('link-wrapper');
  test.forEach(el => {
    el.addEventListener('click', () => {
      console.log('test2');
    })
  });
