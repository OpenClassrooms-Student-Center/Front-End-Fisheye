
let JsonData={}
let photographers=[]

fetch('/data/photographers.json')
  .then(
  function(response) {
      if (response.status !== 200) {
        console.log('Problem. Status Code: ' +response.status);
        return;
      }

      response.json().then(function(data) {
          JsonData = data;
          console.log(JsonData);
      });
  })
  .catch(function(err) {
      console.log('Fetch Error :-S', err);
  });



async function getPhotographers() {  

    photographers = JsonData.photographers;       
    return ({photographers: [...photographers, ...photographers, ...photographers]})
}

function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/zzportrait/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

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
    
