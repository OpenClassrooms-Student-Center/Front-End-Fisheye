export default class PhotographerAllMedias {
    constructor(medias) {
      this.medias = medias;
    }


render() {
    const mediaWrapper = document.querySelector(".photograph-medias");
    const allMedias = this.medias.map ((media)=> {
        const { title, src, image, video, likes } = media;
        if (image) {
          return `
          <article class="media-card">       
            <img src="${src}" alt="${title}">
            <div class="media-text">          
              <h2 class="media-title">${title}</h2>
              <div class="media-likes">
                <span class="numbers-likes">${likes}</span>
                <span class="heart"></span>
              </div>
            </div>
          </article>
        `;
        } else if (video) {
          return `
          <article class="media-card">   
            <video src="${src}"  alt="${title}" type="video/mp4"></video>      
            <div class="media-text">
              <h2 class="media-title">${title}</h2>
              <div class="media-likes">
                <span class="numbers-likes">${likes}</span>
                <span class="heart"></span>
              </div>
            </div>
          </article>  
        `;
        }
    })
    // retirer la , entre chaque card
    .join("");
    mediaWrapper.innerHTML = allMedias;


    // Ajouter un événement au clic de heart
    const heart = document.querySelector('.heart');
    const numbersLikes = document.querySelector('.numbers-likes');

    heart.addEventListener('click', () => {
        this.toggleLike(heart, numbersLikes)
      }
    );
}

  toggleLike(heart, numbersLikes) {

    !heart.classList.contains("liked") ? this.likes++ : this.likes--;

    heart.classList.toggle("liked");
    numbersLikes.textContent = this.likes

    // Appeler la fonction pour mettre à jour le total des likes
    updateTotalLikes();
    
    console.log(this.likes)
  }
  // fonction de mise à jour des likes
  updateTotalLikes() {

    const totalLikes = document.querySelector(".total-likes");

    // Recalculer la somme totale des likes
    const updatedTotalLikes = mediaObjects.reduce((sum, mediaObject) => sum + mediaObject.likes, 0);

    // Mettre à jour la valeur affichée
    totalLikes.textContent = updatedTotalLikes;
    console.log(updatedTotalLikes)
    
  }

}

