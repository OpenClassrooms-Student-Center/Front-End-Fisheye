import MediasFactory from "../factories/MediasFactory.js";
/*import Media from "../models/Media.js";*/

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
          
        const card = mediaObject.render();
        mediaWrapper.append(card);
        return card;
        
      });

      console.log(mediaObjects)
    

      const body = document.querySelector("body");
      const likesAndPrice = document.createElement("div");
      likesAndPrice.classList.add("likes-price");

      // Somme totale des likes
      const sommeTotalLikes = mediaObjects.reduce((sum, mediaObject) => sum + mediaObject.likes, 0);

      // Afficher la somme totale des likes et prix du photographe 
     likesAndPrice.innerHTML = `
                            <div class="likes">
                              <span class="total-likes">${sommeTotalLikes}</span>
                              <img src="assets/icons/black-heart.svg" alt="icon coeur">
                            </div>
                            <div class="price">
                             <p> ${photographer.price}€ / jour</p>
                            </div>
                            `;
                            
    // fonction de mise à jour des likes
    function updateTotalLikes() {

      const totalLikes = document.querySelector(".total-likes");

      // Recalculer la somme totale des likes
      const updatedTotalLikes = mediaObjects.reduce((sum, mediaObject) => sum + mediaObject.likes, 0);

      // Mettre à jour la valeur affichée
      totalLikes.textContent = updatedTotalLikes;
      console.log(updatedTotalLikes)
      
    }


    // Ajouter la fonction à la portée globale pour qu'elle soit accessible depuis Media.js
    window.updateTotalLikes = updateTotalLikes;  


    body.append(likesAndPrice);
    
    console.log(likesAndPrice)
     
    }

  })

