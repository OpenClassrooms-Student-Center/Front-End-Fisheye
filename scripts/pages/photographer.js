import MediasFactory from "../factories/MediasFactory.js";

// Récupérer l'ID du photographe depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get('id'));

// Récupérer les données des photographes
fetch("./data/photographers.json")
  .then((response) => response.json()) // Convertir la réponse en JSON
  .then((data) => {
    const photographers = data.photographers;
    const medias = data.media;

    // Trouver le photographe correspondant
    const photographer = photographers.find((element) => element.id === photographerId);

    // Afficher les détails du photographe
    if (photographer) {
      /*const photographerDetails = document.createElement('div');*/
      const photographerHeader = document.querySelector(".photograph-header");
      photographerHeader.innerHTML = ` 
      <div class="photograph-text">
        <h1 class="name">${photographer.name}</h1>
        <p class="location">${photographer.city}, ${photographer.country}</p>
        <p class="tagline">${photographer.tagline}</p>
      </div>
      <button class="contact_button" onclick="displayModal()">Contactez-moi</button>  
      <img class="portrait" src="assets/photographers/portrait/${photographer.portrait}" alt="${photographer.name}">
      `;

      const modalTitleName = document.querySelector(".modal-title_name");
      modalTitleName.append(photographer.name);

      // Récupérer les médias correspondant au photographe
      const mediaWrapper = document.querySelector(".photograph-medias");
      const photographerMedias = medias.filter((element) => element.photographerId === photographerId);
      
     const mediaObjects = photographerMedias.map((media)=> {
   
      return new MediasFactory(media)
               
     })

      mediaObjects.map((mediaObject) => {

      // Utilisez la méthode mediaCard de la class Media pour créer une card du media
      const mediaCard = mediaObject.createCard(); 
      
      // Ajoutez la card média à mediaWrapper
      mediaWrapper.append(mediaCard);
      console.log(mediaCard)

      return mediaCard;
    
     })
     
     console.log(mediaObjects)
     
       /* const mediaCard = document.createElement("div");
        mediaCard.classList.add("photograph-media");

        const mediathumbnail = media.image
                ? ` <img class="" src="assets/photographers/${photographer.name}/${media.image}" alt="${media.image}">`
                : ` <video class="" aria-label="${media.alt}">
                        <source src="./assets/photographers/${photographer.name}/${media.video}" type="video/mp4">
                    </video>`;

            mediaCard.innerHTML = `       
              ${mediathumbnail}
          <div class="media-text">
            <h2 class="media-title">${media.title}</h2>
            <span class="media-like">${media.likes} likes</span>
          </div>
        `;       
        photographerMedias.appendChild(mediaCard);*/
     
    }

  })



  