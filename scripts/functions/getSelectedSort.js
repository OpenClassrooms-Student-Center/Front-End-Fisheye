import createPhotoCard from '../templates/Card.js';
import sliderModal from '../model/slider.js';

export default function getSelectedSort(data) {
  const sortMedia = [...data];

  const optionsContainer = document.querySelector('.filter__options');
  const btndrop = document.querySelector('.button__top');
  const btnValue = document.querySelector('.btn__value');
  const liItems = document.querySelectorAll('.dropdown li');
  const first = document.querySelector('.first__option');
  btnValue.innerHTML = first.innerHTML;

  let toggleIndex;
  function dropDown() {
    if (!toggleIndex) {
      optionsContainer.style.height = `${optionsContainer.scrollHeight}px`;
      toggleIndex = true;
      btndrop.style.display = 'none';
      btndrop.ariaHidden = 'true';
      optionsContainer.ariaHidden = 'false';
      liItems.forEach((item) => {
        console.log(item);
      });
      return;
    }
    optionsContainer.style.height = 0;
    btndrop.style.display = 'flex';
    btndrop.ariaHidden = 'false';
    optionsContainer.ariaHidden = 'true';
    toggleIndex = false;
  }
  btndrop.addEventListener('click', dropDown);

  liItems.forEach((item) => {
    const option = item.querySelector('a');
    item.addEventListener(('click'), () => {
      if (option.innerHTML === 'Popularité') {
        dropDown();
        btnValue.innerHTML = option.innerHTML;
        sortMedia.sort((a, b) => b.likes - a.likes);
      } else if (option.innerHTML === 'Date') {
        dropDown();
        btnValue.innerHTML = option.innerHTML;
        sortMedia.sort((a, b) => new Date(a._date) - new Date(b._date));
      } else if (option.innerHTML === 'Titre') {
        dropDown();
        btnValue.innerHTML = option.innerHTML;
        sortMedia.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          } if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return null;
        });
      }
      const cardContainer = document.querySelector('.photo-field');
      cardContainer.innerHTML = '';

      sortMedia.forEach((media) => {
        const card = document.createElement('article');
        card.classList.add('cardMedia');
        card.innerHTML = createPhotoCard(media);
        const eltCard = cardContainer.appendChild(card);
        const elt = eltCard.querySelector('.photo');
        elt.addEventListener('click', () => sliderModal(media, sortMedia));
        const like = eltCard.querySelector('.photo__likes');
        like.addEventListener('click', (e) => media.toggleLike(e));
      });
    });
  });

  return sortMedia;
}
