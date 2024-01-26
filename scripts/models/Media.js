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
        mediaCard.classList.add("photograph-media");

        mediaCard.innerHTML = `       
          <div class="media-text">
            <h2 class="media-title">${this.title}</h2>
            <span class="media-like">${this.likes} likes</span>
          </div>
        `;

        return mediaCard
  }

  addLike() {
    
  }
}

