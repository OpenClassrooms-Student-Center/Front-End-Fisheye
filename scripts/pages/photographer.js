import PhotographerFactory from '../factories/photographer.js';
import Api from '../api/api.js';
import Lightbox from '../utils/lightbox.js';

class App {
  constructor() {
    this.photographersApi = new Api('./data/photographers.json');
    this.url = new URL(document.location);

    this.$mediaWrapper = document.querySelector('.media');
    this.$sorterWrapper = document.getElementsByName('sorter');
    this.$photographHeaderWrapper =
      document.querySelector('.photograph-header');

    this.photographerData = {};
  }

  async fetchData() {
    const localPhotographerData = JSON.parse(
      localStorage.getItem('photographerData'),
    );

    if (localPhotographerData) {
      this.photographerData = {
        photographers: localPhotographerData.photographers.map(
          (photograph) => new PhotographerFactory(photograph),
        ),
        media: localPhotographerData.media.map(
          (media) => new PhotographerFactory(media),
        ),
      };
    } else {
      const data = await this.photographersApi.get();
      this.photographerData = {
        photographers: data.photographers.map(
          (photograph) => new PhotographerFactory(photograph),
        ),
        media: data.media.map((media) => new PhotographerFactory(media)),
      };
    }
  }

  getPhotographerById() {
    const id = this.getUrlId();
    const photographerIdExist = this.photographerData.photographers.some(
      (obj) => obj.id === id,
    );

    if (photographerIdExist) {
      return this.photographerData.photographers.find(
        (photographer) => photographer.id === id,
      );
    }
    window.location.replace(window.location.origin);
    return null;
  }

  getMediaByPhotographerId() {
    const id = this.getUrlId();
    const photographerIdExist = this.photographerData.photographers.some(
      (obj) => obj.id === id,
    );

    if (photographerIdExist) {
      return this.photographerData.media.filter(
        (media) => media.photographerId === id,
      );
    }
    window.location.replace(window.location.origin);
    return null;
  }

  getSumLikes() {
    const ArrayMediaLikes = Array.from(this.getMediaByPhotographerId()).map(
      (media) => media.likes,
    );
    const sum = ArrayMediaLikes.reduce((a, b) => a + b);
    return sum;
  }

  liked() {
    let id;
    document.querySelectorAll('.media__article__desc__like').forEach((elt) => {
      elt.querySelector('svg').addEventListener('click', () => {
        id = parseInt(elt.id, 10);
        const mediaById = this.getMediaByPhotographerId().find(
          (media) => media.id === id,
        );
        mediaById.incrementLikes();
        this.saveLocalStorage();
        this.displayMedia(this.getSorter());
      });
    });
  }

  getUrlId() {
    const params = this.url.searchParams;
    return parseInt(params.get('photographerId'), 10);
  }

  getSorter() {
    const params = this.url.searchParams;
    return params.get('sorting');
  }

  displayNameIntoForm() {
    const wrapper = document.querySelector('.modal header h2');
    wrapper.innerHTML += `<br> ${this.getPhotographerById().name}`;
  }

  displayHeader() {
    this.$photographHeaderWrapper.innerHTML =
      this.getPhotographerById().userHeaderCard;
  }

  displaySummaryMedia() {
    const likes = document.querySelector('.summary__likes');
    const price = document.querySelector('.summary__price');
    const sumLikes = this.getSumLikes();
    const valuePrice = this.getPhotographerById().price;

    likes.setAttribute('value', sumLikes);
    price.setAttribute('value', valuePrice);
    likes.innerText = sumLikes;
    price.innerText = `${valuePrice}€ / jour`;
  }

  displayMedia() {
    this.$mediaWrapper.innerHTML = '';
    const sorter = this.getSorter();
    const defaultSorter = 'like';
    let media;

    if (!sorter) {
      media = this.sortingMedia(defaultSorter);
      this.url.searchParams.set('sorting', defaultSorter);
      window.history.pushState({}, '', this.url);
    } else if (this.sortingMedia(sorter) === null) {
      this.url.searchParams.delete('sorting');
      window.history.pushState({}, '', this.url);
      this.update();
    } else {
      media = this.sortingMedia(sorter);
    }
    media.forEach((m) => {
      const DOM = m.mediaCard;
      this.$mediaWrapper.appendChild(DOM);
    });
    this.liked();
    this.displaySummaryMedia();
    Lightbox.init();
  }

  displaySorter() {
    const btnSelectedSorter = document.querySelector('.sorter__selected');
    const listSorter = document.querySelector('.sorter__list');

    btnSelectedSorter.addEventListener('click', (e) => {
      e.target.style.display = 'none';
      listSorter.style.display = 'block';
    });

    this.$sorterWrapper.forEach((element) => {
      element.addEventListener('click', (e) => {
        const sorter = e.target.value;
        let sorterText;

        this.url.searchParams.set('sorting', sorter);
        window.history.pushState({}, '', this.url);
        switch (sorter) {
          case 'like':
            sorterText = 'Popularité';
            break;
          case 'date':
            sorterText = 'Date';
            break;
          case 'title':
            sorterText = 'Titre';
            break;
          default:
            throw new Error('invalid sorter');
        }
        btnSelectedSorter.innerText = sorterText;
        listSorter.style.display = 'none';
        btnSelectedSorter.style.display = 'block';
        this.update();
      });
    });
  }

  sortingMedia(sorter) {
    if (sorter === 'like') {
      return Array.from(this.getMediaByPhotographerId()).sort(
        (a, b) => b.likes - a.likes,
      );
    }
    if (sorter === 'date') {
      return Array.from(this.getMediaByPhotographerId()).sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
    }
    if (sorter === 'title') {
      return Array.from(this.getMediaByPhotographerId()).sort((a, b) =>
        a.title.localeCompare(b.title),
      );
    }
    return null;
  }

  update() {
    this.displayMedia();
    Lightbox.init();
  }

  saveLocalStorage() {
    localStorage.setItem(
      'photographerData',
      JSON.stringify(this.photographerData),
    );
  }

  async main() {
    try {
      await this.fetchData();
      this.displayHeader();
      this.displaySorter();
      this.displayMedia(this.getSorter());
      this.displayNameIntoForm();
    } catch (e) {
      console.log(e);
    }
  }
}

const app = new App();
app.main();
