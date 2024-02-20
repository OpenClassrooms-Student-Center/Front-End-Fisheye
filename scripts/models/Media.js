import Photographer from "./Photographer.js";

export default class Media extends Photographer {
    constructor(data) {
      super(data);
      this.id = data.id;
      this.photographerId = data.photographerId;
      this.title = data.title;
      this.likes = data.likes;
      this.date = data.date;
      this.price = data.price;
      this.alt = data.alt;
}

  createCard() {

      const mediaCard = document.createElement("article");
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
          this.toggleLike(heart, numbersLikes);
          this.updateTotalLikes();
        }
      );

      return mediaCard;

  }
    updateTotalLikes() {
      const totalLikes = document.querySelector(".total_likes");
      const allLikes = document.querySelectorAll('.numbers-likes');
      const calculeTotalLikes = Array.from(allLikes).reduce((total, like) => total + parseInt(like.textContent), 0);
      totalLikes.textContent = calculeTotalLikes;    
  }
  toggleLike(heart, numbersLikes) {

    !heart.classList.contains("liked") ? this.likes++ : this.likes--;

    heart.classList.toggle("liked");
    numbersLikes.textContent = this.likes;

  }
  

}


