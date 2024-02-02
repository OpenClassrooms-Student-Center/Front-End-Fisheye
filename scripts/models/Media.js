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
            <span class="media-likes" id="likes-${this.id}" data-likes="${this.likes}">${this.likes} <img class="heart"src="assets/icons/red-heart.svg" alt="icon coeur rouge"></span>
          </div>
        `;

  // Ajouter un événement de clic pour toggleLike
  const heart = mediaCard.querySelector('.heart');
  heart.addEventListener('click', () => this.toggleLike());

  return mediaCard;
}

toggleLike() {
  // Récupérer l'élément span des likes
  const likesSpan = document.getElementById(`likes-${this.id}`);

  // Récupérer la valeur actuelle des likes
  let currentLikes = parseInt(likesSpan.getAttribute('data-likes'));

  // Incrémenter ou décrémenter les likes en fonction de l'état actuel
  if (likesSpan.classList.contains('liked')) {
    currentLikes -= 1;
  } else {
    currentLikes += 1;
  }

  // Mettre à jour la valeur des likes
  likesSpan.innerHTML = `${currentLikes} <img class="heart"src="assets/icons/red-heart.svg" alt="icon coeur rouge">`;

  // Basculez la classe liked pour indiquer l'état actuel
  likesSpan.classList.toggle('liked');

  // Mettre à jour l'attribut data-likes
  likesSpan.setAttribute('data-likes', currentLikes);

  // Mettez à jour la valeur de likes dans l'objet Media
  this.likes = currentLikes;
}
}

