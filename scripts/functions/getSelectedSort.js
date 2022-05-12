import createPhotoCard from '../templates/Card.js';
import sliderFactory from '../factories/slider.js';

export default function getSelectedSort(data) {
  const sortMedia = [...data];

  const optionsContainer = document.querySelector('.filter__options');
  const btndrop = document.querySelector('.button__top');
  const btnValue = document.querySelector('.button__top span');
  const liItems = document.querySelectorAll('.dropdown li');
  const first = document.querySelector('.first__option');
  btnValue.innerHTML = first.innerHTML;

  let toggleIndex;
  function dropDown() {
    if (!toggleIndex) {
      optionsContainer.style.height = `${optionsContainer.scrollHeight}px`;
      toggleIndex = true;
      btndrop.style.display = 'none';
      return;
    }
    optionsContainer.style.height = 0;
    btndrop.style.display = 'flex';
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
        });
      }
      const cardContainer = document.querySelector('.photo-field');
      cardContainer.innerHTML = '';

      sortMedia.forEach((media) => {
        const card = document.createElement('article');
        card.classList.add('cardMedia');
        card.innerHTML = createPhotoCard(media);
        const elt = cardContainer.appendChild(card);

        elt.addEventListener('click', () => sliderFactory(media, sortMedia));
      });
    });
  });

  return sortMedia;
}
