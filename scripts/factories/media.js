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
      media.setAttribute('controls', true);
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
    const textbox = document.createElement('p');
    textbox.classList.add('flex-red');
    const tag = document.createElement('p');
    tag.textContent = title;
    const heart = document.createElement('span');
    heart.innerHTML = `${likes} <i class="fas fa-heart counter"></i>`;
    card.appendChild(media);
    card.appendChild(textbox);
    textbox.appendChild(tag);
    textbox.appendChild(heart);
    return (card)
  }
  return { id, photographerId, title, image, likes, video, createMediaCards };
}


