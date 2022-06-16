import Photo from '../model/CardPhoto.js';
import Video from '../model/CardVideo.js';
import sliderModal from '../model/slider.js';

export default function mediaFactory(media, name) {
  function createCard(data, container, sortMedia) {
    const article = `<${data.elt._tag} src=${data.elt._path} role="Image link" aria-Label="${media.title}, vue de présentation}" tabindex="0" class="photo"></${data.elt._tag}>
                  <aside class="media__aside">
                      <span class="photo__title" >${media.title}</span>
                      <span class="photo__likes" aria-label=${media.userLike ? 'enlever like' : 'ajouter like'} tabindex="0">
                          <span>${media.likes}</span>
                          <i class="fas fa-heart" role="Image" aria-label="likes">
                      </i></span>
                  </aside>`;

    const card = document.createElement('article');
    card.classList.add('cardMedia');
    card.innerHTML = article;
    const cardElt = container.appendChild(card);
    const like = cardElt.querySelector('.photo__likes');
    like.addEventListener('click', (e) => data.elt.toggleLike(e));
    const img = cardElt.querySelector('.photo');
    img.addEventListener('click', () => sliderModal(media, sortMedia));
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Enter' && e.target === img) sliderModal(media, sortMedia);
    });

    return card;
  }

  if (media.image) {
    const elt = new Photo(media, name);
    return { elt, createCard };
  } if (media.video) {
    const elt = new Video(media, name);
    return { elt, createCard };
  }
  return null;
}
