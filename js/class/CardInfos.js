import Media from './Media.js';

export default class CardInfos {
  constructor (price) {
    this.price = price;
  };

  static updateTotalLike = () => {
    document.getElementById('counter-likes').innerHTML = Media.totalLikes;
  };

  getView = () => {
    const container = document.createElement('aside');
    container.setAttribute('id', 'card-infos');
    container.setAttribute('class', 'card-infos');
    container.setAttribute('tabindex', '0');

    const counterLike = document.createElement('div');
    counterLike.setAttribute('class', 'card-infos__nb-likes');
    counterLike.innerHTML =
    `<span id="counter-likes" class="nb-likes">${Media.totalLikes}</span>
    <i class="fas fa-heart" aria-label="likes"></i>`;

    container.appendChild(counterLike);
    container.innerHTML = container.innerHTML + `<p>${this.price}€ / jour</p>`;

    return container;
  };
}
