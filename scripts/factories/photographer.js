// fonction pour lancer la creation des cards en html
function displayData(photographers) {
  const photographerSection = document.querySelector(".photographer-section");
  var userCardDOM ="";
  
console.dir(photographers);
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    userCardDOM += photographerModel.getUserCardDOM();
    
  });

  
  photographerSection.innerHTML = userCardDOM;
}

// fonction pour constuire des elements html
function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  function getUserCardDOM() {
   return  `<article>
          <a class="photographer-link" href="./photographer.html?id=${id}">
              <img src="assets/photographers/${portrait}">
              <h2>${name}</h2>
              </a>
          <div class="photographer-details">
                      <h3>${city}, ${country}</h3>
                      <h4>${tagline}</h4>
                      <h5>${price}€ /jour</h5>
          </div>
          </article>`
          ;
  }

  return { getUserCardDOM, name, portrait, city, country, tagline, price, id };
}

//fonction pour construire la page photographer.html

export { displayData };
