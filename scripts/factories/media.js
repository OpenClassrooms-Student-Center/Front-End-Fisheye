// Création des cartes médias pour la page des photographes.
function mediaFactory(data) {
  const { id, photographerId, title, image, likes, video } = data;
  const picture = `assets/photos/${photographerId}/${image}`;
  const videoUrl = `assets/photos/${photographerId}/${video}`;

  function createMediaCards(i) {
    const card = document.createElement('article');
    card.classList.add('media-card');
    let media;
    if (image === undefined) {
      media = document.createElement('video');
      media.classList.add('video', 'media');
      mediaSrc = document.createElement('source');
      mediaSrc.setAttribute("src", videoUrl);
      media.appendChild(mediaSrc);
    } else {
      media = document.createElement('img');
      media.classList.add('media');
      media.setAttribute('src', picture);
      media.setAttribute('alt', `${title}`);
    }
    media.setAttribute('data-index', i);
    media.setAttribute('role', 'image link')
    const textbox = document.createElement('p');
    textbox.classList.add('flex-red');
    const likesContainer = document.createElement('p');
    const tag = document.createElement('p');
    tag.textContent = title;
    const heart = document.createElement('span');
    heart.classList.add('likes-counter');
    heart.innerText = likes;
    const heartIcon = document.createElement('i');
    heartIcon.classList.add('fas', 'fa-heart', 'counter')
    heart.setAttribute('aria-label', 'likes')
    card.appendChild(media);
    card.appendChild(textbox);
    textbox.appendChild(tag);
    likesContainer.appendChild(heart);
    likesContainer.appendChild(heartIcon);
    textbox.appendChild(likesContainer)
    return (card)
  }
  return { id, photographerId, title, image, likes, video, createMediaCards };
}


