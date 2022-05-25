import createPhotoCard from '../templates/Card.js';
import sliderModal from '../model/slider.js';

export default function getSelectedSort(data) {
  const sortMedia = [...data];

  const body = document.querySelector('body');
  const optionsContainer = document.querySelector('.filter__options');
  const btndrop = document.querySelector('.button__top');
  const btnValue = document.querySelector('.btn__value');
  const liItems = document.querySelectorAll('.dropdown li');
  const first = document.querySelector('.first__option');
  btnValue.innerHTML = first.innerHTML;
  let toggleIndex;

  function sortlikes() {
    sortMedia.sort((a, b) => b.likes - a.likes);
  }

  function sortDate() {
    sortMedia.sort((a, b) => new Date(a._date) - new Date(b._date));
  }

  function sortTitle() {
    sortMedia.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return null;
    });
  }

  function createCardsMedia() {
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
  }

  function dropDown() {
    if (!toggleIndex) {
      optionsContainer.style.height = `${optionsContainer.scrollHeight}px`;
      toggleIndex = true;
      btndrop.style.display = 'none';
      btndrop.ariaHidden = 'true';
      optionsContainer.ariaHidden = 'false';
      return;
    }
    optionsContainer.style.height = 0;
    btndrop.style.display = 'flex';
    btndrop.ariaHidden = 'false';
    optionsContainer.ariaHidden = 'true';
    toggleIndex = false;
  }

  function keySelect(e) {
    if (e.target.id === 'btnListbox' && (e.code === 'ArrowDown' || 'ArrowUp')) {
      body.style.overflow = 'hidden';
      const valueTarget = e.target.querySelector('span');
      const result = [...liItems].filter((li) => {
        const liValue = li.querySelector('a');
        if (liValue.innerHTML === valueTarget.innerHTML) {
          return true;
        } return false;
      });
      if (result[0].nextElementSibling !== null && e.code === 'ArrowDown') {
        btnValue.innerHTML = result[0].nextElementSibling.childNodes[1].textContent;
      } else if (result[0].previousElementSibling !== null && e.code === 'ArrowUp') {
        btnValue.innerHTML = result[0].previousElementSibling.childNodes[1].textContent;
      }
      if (btnValue.innerHTML === 'Popularité') sortlikes();
      else if (btnValue.innerHTML === 'Date') sortDate();
      else if (btnValue.innerHTML === 'Titre') sortTitle();
      createCardsMedia();
      optionsContainer.ariaHidden = 'true';
      console.log(optionsContainer.ariaHidden);
    }
  }

  function reactiveScroll(e) {
    if (e.target.id === 'btnListbox') body.style.overflow = 'scroll';
  }

  btndrop.addEventListener('click', dropDown);
  document.addEventListener('keydown', keySelect);
  document.addEventListener('keyup', reactiveScroll);

  liItems.forEach((item) => {
    const option = item.querySelector('a');
    item.addEventListener(('click'), () => {
      if (option.innerHTML === 'Popularité') {
        dropDown();
        btnValue.innerHTML = option.innerHTML;
        sortlikes();
      } else if (option.innerHTML === 'Date') {
        dropDown();
        btnValue.innerHTML = option.innerHTML;
        sortDate();
      } else if (option.innerHTML === 'Titre') {
        dropDown();
        btnValue.innerHTML = option.innerHTML;
        sortTitle();
      }

      createCardsMedia();
    });
  });

  return sortMedia;
}
