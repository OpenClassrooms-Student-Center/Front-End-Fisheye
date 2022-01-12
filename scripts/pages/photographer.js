const urlParams = new URLSearchParams(window.location.search); // on recherche dans l'url de la page
const photographerSelectedId = urlParams.get("id"); // on récupère l'Id du photographe dans l'url 

// récupération des données correspondant aux photographes
function getSelectedPhotographerData() {
    fetch(`../data/photographers.json`) // on récupère les données
      .then((res) => res.json())
      .then((value) => {
        photographers = value.photographers;
        medias = value.media;
        displayPhotographerSelected(photographers);
        displayPhotographerSelectedMedias(medias);
      })
  }

  function displayPhotographerSelected(photographers) {
    photographers.find((photographer) => {
      if(photographer.id == photographerSelectedId) {
        const photographerModel = photographerCardFactory(photographer);
        photographerModel.getPhotographerCard();
      }
    });
  };

  function displayPhotographerSelectedMedias(medias) {
    const mediaSection = document.getElementById("photograph-medias");
    
    medias.forEach((media) => {
      if(media.photographerId == photographerSelectedId) {
        const mediaModel = mediaFactory(media);
        const mediaCard = mediaModel.getMediaCard();
        mediaSection.appendChild(mediaCard);
      }
    })
  }
  
  getSelectedPhotographerData();
