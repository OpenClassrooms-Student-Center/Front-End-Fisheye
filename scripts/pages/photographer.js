// Récupérer l'id de l'url
async function getPhotographerData() {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  console.log(id);

// Récupérer les données du photographe en fonction de l'id de l'url ainsi que les médias
  const response = await fetch("../data/photographers.json");
  const data = await response.json();
  const photographer = data.photographers.filter((photographer) => photographer.id == id);
  console.log(photographer);

  const responseMedia = await fetch("../data/photographers.json");
  const dataMedia = await responseMedia.json();
  const media = dataMedia.media.filter((media) => media.photographerId == id);
  console.log(media);
 

// Créer la carte du photographe
  const photographerCard = document.querySelector(".photograph-header");
  
  photographerCard.innerHTML = `
  <figure>
    <figcaption tabindex=${photographer[0].tabindex}>
      <img src="assets/photographers/${photographer[0].portrait}" alt="portrait de ${photographer[0].name}" tabindex=${photographer[0].tabindex}>
    </figcaption>
    <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
    <div class="photograph-info">
      <h1 tabindex=${photographer[0].tabindex}>${photographer[0].name}</h1>
      <div tabindex=${photographer[0].tabindex}> 
      <h2>${photographer[0].city}, ${photographer[0].country}</h2>
      <p>${photographer[0].tagline}</p>
      </div>
    </div>
  </figure>
  `;

  // Créer la liste des photos du photographe en créeant un élément html div 
  const mediaList = document.querySelector(".photograph-media");

  media.forEach((photographer) => {
    console.log(photographer);
    console.log("The title: "+ photographer.title);
    mediaList.innerHTML += `
        <h2>${photographer.title}</h2>
        <p>${photographer.likes} <i class="fas fa-heart"></i></p>
        <p>${photographer.price}€</p>
        <p>${photographer.tags}</p>
    `;
  }

  );
  

}



getPhotographerData();




