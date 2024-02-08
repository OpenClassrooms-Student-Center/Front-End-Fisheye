//import Photographer from "./Photographer.js";

export default class Media {
    constructor(data) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.likes = data.likes;
        this.date = data.date;
        this.price = data.price;
        this.alt = data.alt;
    }
    
  createCard() {

      const mediaCard = document.createElement("div");
      mediaCard.classList.add("media-card");

      mediaCard.innerHTML = `       
        <div class="media-text">
          <h2 class="media-title">${this.title}</h2>
          <div class="media-likes">
            <span class="numbers-likes">${this.likes}</span>
            <span class="heart"></span>
          </div>
        </div>
      `;

      // Ajouter un événement au clic de heart
      const heart = mediaCard.querySelector('.heart');
      const numbersLikes = mediaCard.querySelector('.numbers-likes');

      heart.addEventListener('click', () => {

        this.toggleLike(heart, numbersLikes)

      }

      );
      return mediaCard;

  }


  toggleLike(heart, numbersLikes) {

    !heart.classList.contains("liked") ? this.likes++ : this.likes--;

    heart.classList.toggle("liked");
    numbersLikes.textContent = this.likes

    // Appeler la fonction pour mettre à jour le total des likes
    updateTotalLikes();
    
    console.log(this.likes)
  }


}


